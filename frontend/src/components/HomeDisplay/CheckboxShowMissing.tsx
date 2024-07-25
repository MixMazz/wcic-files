import { useTableContext } from 'src/contexts/HomeTableContext';

const CheckboxShowMissing = () => {
  const { showMissing, setShowMissing } = useTableContext();
  return (
    <div id="showMissingCheckbox">
      <label id="missingCheckboxLabel">
        <input name="showMissing" data-testid="showMissingToggle" type="checkbox" checked={showMissing} onChange={() => setShowMissing(prev => !prev)} />
        <span>Only show missing</span>
      </label>
    </div>
  )
};

export default CheckboxShowMissing;
