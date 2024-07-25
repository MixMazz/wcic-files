import 'src/components/HomeDisplay/HemisphereToggle.css';
import { useTimeContext } from 'src/contexts/TimeContext';
import { Hemisphere } from 'src/utils/critterTypes';

const HemiRadio: React.FC<{ hemiLabel: Hemisphere }> = ({ hemiLabel }) => {
  const { hemisphere, toggleHemisphere } = useTimeContext();

  return (
    <label className="radio">
      <input type="radio" value={hemiLabel} name="hemi" checked={hemisphere === hemiLabel} onChange={toggleHemisphere} />
      <span className="hemiToggleName">{hemiLabel}</span>
    </label>
  )
}

const HemisphereToggle = () => {

  return (
    <div id="hemisphereToggle">
      <span id="hemispherelabel" />
      <div id="hemisphereToggleInternal">
        <HemiRadio hemiLabel='Northern' />
        <HemiRadio hemiLabel='Southern' />
      </div>
    </div>
  );
}

export default HemisphereToggle;
