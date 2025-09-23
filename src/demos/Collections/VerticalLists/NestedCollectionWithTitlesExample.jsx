import Collection from "../../../lib/Collections/Collection";
import "./ListExample.css";

const NestedCollectionWithTitlesExample = () => {
  return (
    <>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "32px", marginBottom: "16px" }}>
        Nested Collection with Titles
      </h3>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        Collection with nested subcollections and titles for better organization.
      </p>

      <Collection
        title="Files"
        ariaLabel="File Explorere with file and edit operations"
        pattern="tree"
        as="ul"
        itemAs="li"
        className="list-unstyled"
      >
        <Collection title="File Operations" as="ul" itemAs="li" pattern="tree">
          <Collection.Item key="new">📄 New File</Collection.Item>
          <Collection.Item key="open">📁 Open File</Collection.Item>
          <Collection.Item key="recent">
            📋 Recent Files
            <Collection
              title="Recent Documents"
              ariaLabel="Recent documents submenu"
              as="ul"
              itemAs="li"
              pattern="menu"
            >
              <Collection.Item key="doc1">Document1.txt</Collection.Item>
              <Collection.Item key="doc2">Presentation.pptx</Collection.Item>
              <Collection.Item key="doc3">Spreadsheet.xlsx</Collection.Item>
            </Collection>
          </Collection.Item>
          <Collection.Item key="save">💾 Save</Collection.Item>
        </Collection>

        <Collection title="Edit Operations" as="ul" itemAs="li" pattern="menu">
          <Collection.Item key="undo">↶ Undo</Collection.Item>
          <Collection.Item key="redo">↷ Redo</Collection.Item>
          <Collection.Item key="cut">✂️ Cut</Collection.Item>
          <Collection.Item key="copy">📋 Copy</Collection.Item>
          <Collection.Item key="paste">📄 Paste</Collection.Item>
        </Collection>

        <Collection title="Export Options" as="ul" itemAs="li" pattern="menu">
          <Collection.Item key="export-pdf">📄 Export as PDF</Collection.Item>
          <Collection.Item key="export-word">📝 Export as Word</Collection.Item>
          <Collection.Item key="export-more">
            📤 More Export Options
            <Collection
              title="Export Formats"
              ariaLabel="Additional export formats"
              as="ul"
              itemAs="li"
              pattern="menu"
            >
              <Collection.Item key="export-html">🌐 HTML</Collection.Item>
              <Collection.Item key="export-markdown">📝 Markdown</Collection.Item>
              <Collection.Item key="export-json">🔗 JSON</Collection.Item>
              <Collection.Item key="export-csv">📊 CSV</Collection.Item>
            </Collection>
          </Collection.Item>
        </Collection>
      </Collection>
    </>
  );
};

export default NestedCollectionWithTitlesExample;
