import { useMemo } from "react";

/**
 * Hook for generating ARIA attributes for collection components
 * @param {Object} options - Configuration options
 * @param {string} options.role - Collection role (listbox, menu, tree, etc.)
 * @param {string} options.selectionMode - Selection mode ('none', 'single', 'multiple')
 * @param {Set} options.selectedKeys - Currently selected items
 * @param {string} options.orientation - 'horizontal' or 'vertical'
 * @param {string} options.pattern - Pre-configured pattern ('menu', 'listbox', 'tree', etc.)
 * @param {string} options.label - Accessible label for the collection
 * @param {string} options.labelledBy - ID of element that labels the collection
 * @param {string} options.describedBy - ID of element that describes the collection
 * @param {string} options.activeDescendant - ID of the currently active descendant element
 * @param {boolean} options.busy - Whether the collection is loading/busy
 * @returns {Object} ARIA attributes for collection and items
 */
export const useCollectionAria = ({
  role,
  selectionMode = "none",
  selectedKeys = new Set(),
  orientation = "vertical",
  label,
  labelledBy,
  describedBy,
  activeDescendant,
  busy,
  parentRole,
  pattern,
} = {}) => {
  // Helper to determine common collection patterns
  const getCollectionPattern = (pattern) => {
    const patterns = {
      listbox: {
        role: "listbox",
        itemRole: "option",
        selectionAttribute: "aria-selected",
      },
      menu: {
        role: "menu",
        itemRole: "menuitem",
        selectionAttribute: "aria-selected",
      },
      tabs: {
        role: "tablist",
        itemRole: "tab",
        selectionAttribute: "aria-selected",
        // Default orientation is horizontal, only specify if vertical
      },
      tree: {
        role: "tree",
        itemRole: "treeitem",
        selectionAttribute: "aria-selected",
      },
      radiogroup: {
        role: "radiogroup",
        itemRole: "radio",
        selectionAttribute: "aria-checked",
        selectionMode: "single",
      },
      grid: {
        role: "grid",
        itemRole: "gridcell",
        selectionAttribute: "aria-selected",
      },
      toolbar: {
        role: "toolbar",
        itemRole: null, // buttons are naturally interactive
        selectionAttribute: "aria-pressed",
      },
      navigation: {
        role: "navigation",
        itemRole: null, // links are naturally interactive
        selectionAttribute: null,
      },
      list: {
        role: "list",
        itemRole: "listitem",
        selectionAttribute: null,
      },
    };

    return patterns[pattern] || {};
  };

  // Determine effective role based on inheritance
  const getEffectiveRole = (explicitRole, parentRole) => {
    // If explicitly set, use it
    if (explicitRole) return explicitRole;

    // Apply inheritance rules based on parent role
    const inheritanceRules = {
      tree: "group", // tree -> group -> group -> group...
      group: "group", // group -> group -> group... (maintains grouping)
      list: "list", // list -> list -> list... (maintains list structure)
      menu: "menu", // menu -> menu -> menu... (for nested menus)
    };

    return parentRole && inheritanceRules[parentRole] ? inheritanceRules[parentRole] : undefined;
  };

  // Compute pattern config with all resolved roles (memoized to prevent dependency issues)
  const config = useMemo(() => {
    const patternConfig = pattern ? getCollectionPattern(pattern) : {};
    const resolvedRole = role || patternConfig.role;
    const effectiveRole = getEffectiveRole(resolvedRole, parentRole);

    return { ...patternConfig, effectiveRole, resolvedRole };
  }, [pattern, role, parentRole]);

  const effectiveRole = config.effectiveRole;

  const getCollectionAriaProps = useMemo(() => {
    return () => {
      const props = {};

      // Base role - use effective role
      if (effectiveRole) {
        props.role = effectiveRole;
      }

      // Selection attributes
      if (selectionMode !== "none") {
        props["aria-multiselectable"] = selectionMode === "multiple";
      }

      // Orientation - only add when it differs from the role's default
      const roleDefaults = {
        tablist: "horizontal",
        toolbar: "horizontal",
        menubar: "horizontal",
        listbox: "vertical",
        menu: "vertical",
        slider: "horizontal",
        scrollbar: "vertical",
        tree: null, // Trees don't use aria-orientation (always hierarchical)
        grid: null, // Grids use row/column model, not orientation
      };

      const finalOrientation = orientation ?? config.orientation;
      const defaultOrientation = roleDefaults[effectiveRole];

      // TODO: Only add aria-orientation if:
      // 1. Role supports orientation (default is not null), AND
      // 2. Orientation is explicitly set or from pattern, AND
      // 3. It differs from the role's default

      if (
        defaultOrientation !== null &&
        finalOrientation &&
        finalOrientation !== defaultOrientation
      ) {
        props["aria-orientation"] = finalOrientation;
      }

      // TODO: Labelling
      if (label) {
        props["aria-label"] = label;
      }
      if (labelledBy) {
        props["aria-labelledby"] = labelledBy;
      }
      if (describedBy) {
      }

      // Active descendant - for composite widgets with keyboard navigation
      if (activeDescendant) {
        props["aria-activedescendant"] = activeDescendant;
      }

      // Busy state - for loading collections
      if (busy !== undefined) {
        props["aria-busy"] = busy;
      }

      return props;
    };
  }, [
    effectiveRole,
    selectionMode,
    orientation,
    label,
    labelledBy,
    describedBy,
    activeDescendant,
    busy,
    config,
  ]);

  const getItemAriaProps = useMemo(() => {
    return (key, options = {}) => {
      const { level, expanded, hasPopup, controls, disabled, current, itemRole, elementType } =
        options;

      const props = {};

      // Item role - prioritize explicit itemRole, then pattern config, then auto-determine
      const resolvedItemRole = itemRole ?? config.itemRole;

      if (resolvedItemRole != null) {
        // If we have an explicit item role from options or pattern, use it
        props.role = resolvedItemRole;
      } else if (effectiveRole) {
        // Auto-determine item role based on effective collection role
        const itemRoles = {
          listbox: "option",
          menu: "menuitem",
          menubar: "menuitem",
          tablist: "tab",
          tree: "treeitem",
          grid: "gridcell",
          radiogroup: "radio",
          list: "listitem",
          toolbar: null, // buttons are naturally interactive, no role needed
          navigation: null, // links are naturally interactive, no role needed
          group: "treeitem", // groups in trees contain tree items
        };

        // Check if we should avoid overriding semantic HTML roles
        const semanticElements = {
          button: "button",
          a: "link",
          article: "article",
          section: "region",
          nav: "navigation",
          aside: "complementary",
          main: "main",
          header: "banner",
          footer: "contentinfo",
          form: "form",
          input: null, // varies by type
          textarea: "textbox",
          select: "combobox",
          img: "img",
          figure: "figure",
          table: "table",
          thead: "rowgroup",
          tbody: "rowgroup",
          tr: "row",
          th: "columnheader",
          td: "cell",
        };

        // Only apply collection item role if element doesn't have semantic role
        if (
          Object.prototype.hasOwnProperty.call(itemRoles, effectiveRole) &&
          itemRoles[effectiveRole] !== null &&
          (!elementType || !semanticElements[elementType])
        ) {
          props.role = itemRoles[effectiveRole];
        }
      }

      // Selection state
      if (selectionMode !== "none" && config.selectionAttribute) {
        const isSelected = selectedKeys.has(key);
        props[config.selectionAttribute] = isSelected;
      }

      // Tree/hierarchical attributes - only for treeitem role
      if (level !== undefined && (props.role === "treeitem" || effectiveRole === "tree")) {
        props["aria-level"] = level;
      }
      if (expanded !== undefined) {
        props["aria-expanded"] = expanded;
      }

      // Interactive attributes
      if (hasPopup) {
        props["aria-haspopup"] = hasPopup;
      }
      if (controls) {
        props["aria-controls"] = controls;
      }
      if (disabled) {
        props["aria-disabled"] = disabled;
      }
      if (current) {
        props["aria-current"] = current;
      }

      return props;
    };
  }, [effectiveRole, selectionMode, selectedKeys, config]);

  /* No role, no selection - just a labeled grouping */
  const getGroupAriaProps = useMemo(() => {
    return (options = {}) => {
      const { label, labelledBy } = options;
      const props = {};

      if (label) {
        props["aria-label"] = label;
      }
      if (labelledBy) {
        props["aria-labelledby"] = labelledBy;
      }

      return props;
    };
  }, []);

  return {
    getCollectionAriaProps,
    getItemAriaProps,
    getGroupAriaProps,
    effectiveRole,
  };
};
