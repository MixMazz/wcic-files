import 'src/components/HomeDisplay/HemisphereToggle.css';
import { useTimeContext } from 'src/contexts/TimeContext';

const HemisphereToggle = () => {
    const { hemisphere, toggleHemisphere } = useTimeContext();
    return (
        <div id="hemisphereToggle">
            <span id="hemispherelabel" />
            <div id="hemisphereToggleInternal">
                <label className="radio">
                    <input type="radio" value="Northern" name="hemi" checked={hemisphere === 'Northern'} onChange={toggleHemisphere} />
                    <span className="hemiToggleName">Northern</span>
                </label>
                <label className="radio">
                    <input type="radio" value="Southern" name="hemi" checked={hemisphere === 'Southern'} onChange={toggleHemisphere} />
                    <span className="hemiToggleName">Southern</span>
                </label>
            </div>
        </div>
    );
}

export default HemisphereToggle;
