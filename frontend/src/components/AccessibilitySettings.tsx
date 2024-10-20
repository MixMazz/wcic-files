import "./AccessibilitySettings.css";
import { ChangeEvent, useState } from "react";
import ReactFocusLock from "react-focus-lock";
import { RxAccessibility } from "react-icons/rx";

const AccessibilitySettings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [stopAnimSetting, setStopAnimSetting] = useState(false);

  const handleAnimations = (e: ChangeEvent<HTMLInputElement>) => {
    setStopAnimSetting(e.currentTarget.checked);
    if (e.currentTarget.checked) {
      document.body.classList.add('stopAnimations');
    } else {
      document.body.classList.remove('stopAnimations');
    }
  }

  const toggleAccessibilityModal = () => {
    setShowSettings(prev => !prev);
  }

  const closePopup = () => {
    setShowSettings(false);
  }

  return (
    <div className="accessibilitySettingsContainer">
      <button aria-label="Open Accessibility settings" onClick={toggleAccessibilityModal} className='accessibilityToggle'>
        <RxAccessibility className='accessibilityIcon' />
      </button>
      {
        showSettings && <ReactFocusLock returnFocus>
          <div role="dialog" className={`accessibilityDialogModal`}>
            <h3>Settings</h3>

            <div className="accessibilityOption">
              <label htmlFor="animationsCheckbox">Stop Animations</label>
              <input onChange={handleAnimations} checked={stopAnimSetting} id="animationsCheckbox" type="checkbox" />
            </div>

            <button onClick={closePopup}>Close</button>
          </div>
        </ReactFocusLock>
      }
    </div>
  )
}

export default AccessibilitySettings