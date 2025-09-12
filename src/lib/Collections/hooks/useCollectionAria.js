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
        orientation: "horizontal",
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

  // Get pattern configuration first if provided
  const patternConfig = pattern ? getCollectionPattern(pattern) : {};
  
  // Resolve the role: explicit role takes priority, then pattern role
  const resolvedRole = role || patternConfig.role;

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

  const effectiveRole = getEffectiveRole(resolvedRole, parentRole);

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

      // Orientation
      if (orientation && ["horizontal", "vertical"].includes(orientation)) {
        props["aria-orientation"] = orientation;
      }

      // Labelling
      if (label) {
        props["aria-label"] = label;
      }
      if (labelledBy) {
        props["aria-labelledby"] = labelledBy;
      }
      if (describedBy) {
        props["aria-describedby"] = describedBy;
      }

      return props;
    };
  }, [effectiveRole, selectionMode, orientation, label, labelledBy, describedBy]);

  const getItemAriaProps = useMemo(() => {
    return (key, options = {}) => {
      const { level, expanded, hasPopup, controls, disabled, current, itemRole } = options;

      const props = {};

      // Item role
      if (itemRole) {
        props.role = itemRole;
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
        if (
          Object.prototype.hasOwnProperty.call(itemRoles, effectiveRole) &&
          itemRoles[effectiveRole] !== null
        ) {
          props.role = itemRoles[effectiveRole];
        }
      }

      // Selection state
      if (selectionMode !== "none") {
        const isSelected = selectedKeys.has(key);

        if (effectiveRole === "radiogroup" || props.role === "radio") {
          props["aria-checked"] = isSelected;
        } else {
          props["aria-selected"] = isSelected;
        }
      }

      // Tree/hierarchical attributes
      if (level !== undefined) {
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
  }, [effectiveRole, selectionMode, selectedKeys]);

  /* No role, no selection - just a labeled grouping */
  const getGroupAriaProps = useMemo(() => {
    return (options = {}) => {
      const { label, labelledBy, level } = options;
      const props = {};

      if (label) {
        props["aria-label"] = label;
      }
      if (labelledBy) {
        props["aria-labelledby"] = labelledBy;
      }
      if (level !== undefined) {
        props["aria-level"] = level;
      }

      return props;
    };
  }, []);


  return {
    getCollectionAriaProps,
    getItemAriaProps,
    getGroupAriaProps,
    getCollectionPattern,
    getEffectiveRole: (explicitRole, parentRole) => getEffectiveRole(explicitRole, parentRole),
    effectiveRole,
  };
};
