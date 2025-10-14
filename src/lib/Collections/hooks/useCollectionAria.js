import { useMemo } from "react";
import {
  COLLECTION_PATTERNS,
  ROLE_INHERITANCE_RULES,
  ROLE_ORIENTATION_DEFAULTS,
  ROLES_WITH_MULTISELECTABLE,
  COLLECTION_ITEM_ROLES,
  SEMANTIC_ELEMENT_ROLES,
} from "../constants/aria-config.js";

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
  busy,
  parentRole,
  pattern,
} = {}) => {
  // Helper to get collection pattern configuration
  const getCollectionPattern = (pattern) => {
    return COLLECTION_PATTERNS[pattern] || {};
  };

  // Determine effective role based on inheritance
  const getEffectiveRole = (explicitRole, parentRole) => {
    // If explicitly set, use it
    if (explicitRole) return explicitRole;

    // Apply inheritance rules based on parent role
    return parentRole && ROLE_INHERITANCE_RULES[parentRole]
      ? ROLE_INHERITANCE_RULES[parentRole]
      : undefined;
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

      // Selection attributes - only for roles that support aria-multiselectable
      // According to ARIA spec, only listbox, tree, grid, and treegrid support aria-multiselectable
      if (selectionMode === "multiple" && ROLES_WITH_MULTISELECTABLE.includes(effectiveRole)) {
        props["aria-multiselectable"] = true;
      }

      // Orientation - only add when it differs from the role's default
      const finalOrientation = orientation ?? config.orientation;
      const defaultOrientation = ROLE_ORIENTATION_DEFAULTS[effectiveRole];

      // Only add aria-orientation if:
      // 1. Role supports orientation (default is not null), AND
      // 2. Orientation is explicitly set or from pattern, AND
      // 3. It differs from the role's default
      if (defaultOrientation !== null && finalOrientation && finalOrientation !== defaultOrientation) {
        props["aria-orientation"] = finalOrientation;
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

      // Busy state - for loading collections
      if (busy !== undefined) {
        props["aria-busy"] = busy;
      }

      return props;
    };
  }, [effectiveRole, selectionMode, orientation, label, labelledBy, describedBy, busy, config]);

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
        // Only apply collection item role if element doesn't have semantic role
        if (
          Object.prototype.hasOwnProperty.call(COLLECTION_ITEM_ROLES, effectiveRole) &&
          COLLECTION_ITEM_ROLES[effectiveRole] !== null &&
          (!elementType || !SEMANTIC_ELEMENT_ROLES[elementType])
        ) {
          props.role = COLLECTION_ITEM_ROLES[effectiveRole];
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
