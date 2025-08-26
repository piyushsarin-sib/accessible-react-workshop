import React, { useState, useRef } from 'react';

// The main App component that renders the toggle switch
export default function BadSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }} >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Status</h1>
        <p className="mb-4 text-gray-600">
          Your account is currently <span className={`font-semibold ${isToggled ? 'text-green-600' : 'text-red-600'}`}>{isToggled ? 'Active' : 'Inactive'}</span>.
        </p>
        <AccessibleToggleSwitch 
          isToggled={isToggled} 
          onToggle={setIsToggled} 
          label="Activate/Deactivate Account" 
        />
      </div>
    </div>
  );
}

/**
 * A custom, accessible toggle switch component built with semantic ARIA attributes.
 * It's designed to be usable by both mouse and keyboard users, and understandable
 * by screen readers.
 * * @param {object} props
 * @param {boolean} props.isToggled - The current state of the switch (on/off).
 * @param {function} props.onToggle - Callback function to update the toggle state.
 * @param {string} props.label - The descriptive label for the toggle, announced by screen readers.
 */
const AccessibleToggleSwitch = ({ isToggled, onToggle, label }) => {
  // We use a ref to programmatically focus the element if needed, though here it's for the element itself.
  const toggleRef = useRef(null);

  const handleClick = () => {
    onToggle(!isToggled);
  };

  const handleKeyDown = (event) => {
    // We handle the Space and Enter keys to activate the toggle,
    // as a custom 'div' element doesn't have this behavior by default.
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); // Prevents default browser actions
      onToggle(!isToggled);
    }
  };

  return (
    // The main container for the custom switch.
    // The hover effect now uses a shadow change for a more stable interaction.
    <div
      ref={toggleRef}
      className={`relative inline-block w-14 h-8 cursor-pointer rounded-full transition-colors duration-200 ease-in-out shadow-inner
                  ${isToggled ? 'bg-green-500' : 'bg-gray-600'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      // ARIA roles and attributes are crucial here.
      // role="switch": Tells assistive technologies that this element is a switch.
      role="switch"
      // aria-checked: Communicates the current state (true/false) to the screen reader.
      aria-checked={isToggled}
      // aria-label: Provides a descriptive name for the switch.
      aria-label={label}
      // tabIndex="0": Makes this element keyboard-focusable. By default, divs are not.
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* The inner 'knob' of the switch, which is purely visual. */}
      <span
        aria-hidden="true"
        className={`absolute w-6 h-6 top-1 left-1 transform bg-white rounded-full shadow-md transition-all duration-200 ease-in-out
                    ${isToggled ? 'translate-x-6' : ''}
                    hover:shadow-xl`}
      ></span>
    </div>
  );
};
