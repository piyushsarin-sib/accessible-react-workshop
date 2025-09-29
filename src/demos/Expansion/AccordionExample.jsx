import React, { useState } from 'react';
import Accordion from '../../lib/Accordion';
import Collection from '../../lib/Collections/Collection';
import { useExpansion } from '../../lib/interactions/expansion/useExpansion';

const AccordionExample = () => {
  // State for controlled accordion
  const [controlledExpanded, setControlledExpanded] = useState(new Set(['section2']));

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>Accordion & Expansion Examples</h1>

      {/* Example 1: Simple Uncontrolled Accordion */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Simple Uncontrolled Accordion</h2>
        <Accordion defaultExpanded={new Set(['basics'])} allowMultiple={false}>
          <Accordion.Item itemKey="basics" title="Getting Started">
            <p>This is the basics section. It contains fundamental information about our product.</p>
            <ul>
              <li>Installation instructions</li>
              <li>Basic configuration</li>
              <li>First steps</li>
            </ul>
          </Accordion.Item>

          <Accordion.Item itemKey="advanced" title="Advanced Features">
            <p>Learn about advanced features and customization options.</p>
            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
              <code>const config = {`{ theme: 'dark', animations: true }`}</code>
            </div>
          </Accordion.Item>

          <Accordion.Item itemKey="faq" title="Frequently Asked Questions">
            <p>Common questions and answers:</p>
            <details>
              <summary>How do I reset my password?</summary>
              <p>Go to settings and click "Reset Password".</p>
            </details>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* Example 2: Controlled Accordion */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Controlled Accordion</h2>
        <p>External controls:</p>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <button onClick={() => setControlledExpanded(new Set(['section1']))}>
            Expand Section 1
          </button>
          <button onClick={() => setControlledExpanded(new Set(['section2']))}>
            Expand Section 2
          </button>
          <button onClick={() => setControlledExpanded(new Set())}>
            Collapse All
          </button>
        </div>

        <Accordion
          expanded={controlledExpanded}
          onExpandedChange={setControlledExpanded}
          allowMultiple={true}
        >
          <Accordion.Item
            itemKey="section1"
            title="User Management"
          >
            <p>Manage users, roles, and permissions.</p>
          </Accordion.Item>

          <Accordion.Item itemKey="section2" title="System Settings">
            <p>Configure system-wide settings and preferences.</p>
          </Accordion.Item>

          <Accordion.Item itemKey="section3" title="Integrations">
            <p>Set up third-party integrations and APIs.</p>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* Example 3: Collection with useExpansion for Trees */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Tree Structure with Collection + useExpansion</h2>
        <FileTreeExample />
      </section>

      {/* Example 4: Custom Expansion Behavior */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Custom Expansion with Separate Toggle</h2>
        <CustomExpansionExample />
      </section>
    </div>
  );
};

// File Tree Example using Collection + useExpansion directly
const FileTreeExample = () => {
  const expansion = useExpansion({
    defaultExpanded: new Set(['src', 'components']),
    allowMultiple: true,
  });

  return (
    <Collection
      pattern="tree"
      as="ul"
      itemAs="li"
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        background: '#fafafa'
      }}
    >
      <Collection.Item
        key="src"
        {...expansion.getItemProps('src', { hasChildren: true })}
        style={{ fontWeight: 'bold' }}
      >
        📁 src {expansion.isExpanded('src') ? '(expanded)' : '(collapsed)'}
        {expansion.isExpanded('src') && (
          <Collection as="ul" itemAs="li" style={{ marginLeft: '20px' }}>
            <Collection.Item
              key="components"
              {...expansion.getItemProps('components', { hasChildren: true })}
            >
              📁 components
              {expansion.isExpanded('components') && (
                <Collection as="ul" itemAs="li" style={{ marginLeft: '20px' }}>
                  <Collection.Item key="button">📄 Button.jsx</Collection.Item>
                  <Collection.Item key="input">📄 Input.jsx</Collection.Item>
                  <Collection.Item key="modal">📄 Modal.jsx</Collection.Item>
                </Collection>
              )}
            </Collection.Item>
            <Collection.Item key="utils">📄 utils.js</Collection.Item>
            <Collection.Item key="app">📄 App.jsx</Collection.Item>
          </Collection>
        )}
      </Collection.Item>

      <Collection.Item
        key="public"
        {...expansion.getItemProps('public', { hasChildren: true })}
      >
        📁 public
        {expansion.isExpanded('public') && (
          <Collection as="ul" itemAs="li" style={{ marginLeft: '20px' }}>
            <Collection.Item key="index">📄 index.html</Collection.Item>
            <Collection.Item key="favicon">🖼️ favicon.ico</Collection.Item>
          </Collection>
        )}
      </Collection.Item>

      <Collection.Item key="readme">📄 README.md</Collection.Item>
    </Collection>
  );
};

// Custom expansion with separate controls
const CustomExpansionExample = () => {
  const expansion = useExpansion({ allowMultiple: false });

  return (
    <Collection pattern="menu" as="div" itemAs="div">
      <Collection.Item
        key="item1"
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>Item with custom click handler</span>
        <button
          {...expansion.getToggleProps('item1')}
          style={{ marginLeft: '10px' }}
        >
          {expansion.isExpanded('item1') ? '▼' : '▶'}
        </button>
      </Collection.Item>

      {expansion.isExpanded('item1') && (
        <div style={{
          background: '#f0f0f0',
          padding: '15px',
          marginBottom: '10px',
          borderRadius: '4px'
        }}>
          <p>This content is revealed when expanded!</p>
          <p>The item above has its own click handler that doesn't interfere with the toggle.</p>
        </div>
      )}

      <Collection.Item
        key="item2"
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>Another item with separate controls</span>
        <button
          {...expansion.getToggleProps('item2')}
          style={{ marginLeft: '10px' }}
        >
          {expansion.isExpanded('item2') ? '▼' : '▶'}
        </button>
      </Collection.Item>

      {expansion.isExpanded('item2') && (
        <div style={{
          background: '#e6f3ff',
          padding: '15px',
          borderRadius: '4px'
        }}>
          <p>Different content for the second item!</p>
        </div>
      )}
    </Collection>
  );
};

export default AccordionExample;