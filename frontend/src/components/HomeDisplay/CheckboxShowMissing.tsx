import React from 'react';

const CheckboxShowMissing: React.FC<{
  checked: boolean,
  handleChange: any
}> = ({ checked, handleChange }) => (
  <div id="showMissingCheckbox">
    <label id="missingCheckboxLabel">
      <input name="showMissing" data-testid="showMissingToggle" type="checkbox" checked={checked} onChange={handleChange} />
      <span>Only show missing</span>
    </label>
  </div>
);

export default CheckboxShowMissing;
