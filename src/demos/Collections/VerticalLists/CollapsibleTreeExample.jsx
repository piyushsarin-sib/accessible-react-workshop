import DynamicTreeExample from "./DynamicTreeExample";
import StaticTreeExample from "./StaticTreeExample";
import DynamicTreeControlledExample from "./DynamicTreeControlledExample";
import StaticTreeControlledExample from "./StaticTreeControlledExample";
import "./ListExample.css";

const CollapsibleTreeExample = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#333" }}>
        🌳 Collapsible Tree Examples
      </h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "32px" }}>
        Demonstrating both controlled and uncontrolled expansion patterns with static and dynamic data.
      </p>

      {/* Uncontrolled Examples */}
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#495057" }}>
          🔸 Uncontrolled Examples
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          Hook manages expansion state internally. Component handles its own state with defaultExpanded.
        </p>

        <DynamicTreeExample />
        <StaticTreeExample />
      </div>

      {/* Controlled Examples */}
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#495057" }}>
          🔹 Controlled Examples
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          Parent component controls expansion state. External state management via expanded + onExpandedChange props.
        </p>

        <DynamicTreeControlledExample />
        <StaticTreeControlledExample />
      </div>
    </div>
  );
};

export default CollapsibleTreeExample;