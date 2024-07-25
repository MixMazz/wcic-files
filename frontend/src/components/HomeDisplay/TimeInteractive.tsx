import React from 'react';
import 'src/components/HomeDisplay/TimeInteractive.css';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { useTimeContext } from 'src/contexts/TimeContext';

type TimeScroller = 'month' | 'hour' | 'meridiem';

const TimeButton: React.FC<{
  text: string;
  type: TimeScroller;
  onClickUp: () => void;
  onClickDown: () => void;
}> = ({
  text, type, onClickUp, onClickDown,
}) => (
    <div className={`timeScroller ${type === 'month' ? 'monthScroller' : 'periodScroller'}`}>
      <button data-testid={`${type}BtnUp`} className="icon" onClick={onClickUp}><span><GoTriangleUp /></span></button>
      <span data-testid={`${type}LabelText`} className="label" >{text}</span>
      <button data-testid={`${type}BtnDown`} className="icon" onClick={onClickDown}><span><GoTriangleDown /></span></button>
    </div>
  );

const TimeInteractive = () => {
  const { hour, month, meridiem, changeHour, changeMonth, toggleMeridiem, allDayOverride, toggleTimeOverride } = useTimeContext();

  const overrideText = allDayOverride ? 'select time' : 'at any time';

  return (
    <div>
      <div id="timeContainer">
        <div id="timeAlignment">
          <div id="timeInteractives">
            <div className={`timeKeeper ${allDayOverride ? 'timeOverride' : ''}`}>
              <TimeButton
                text={month}
                type="month"
                onClickUp={() => changeMonth('minus')}
                onClickDown={() => changeMonth('plus')}
              />
              <TimeButton
                text={hour.toString()}
                type="hour"
                onClickUp={() => changeHour('minus')}
                onClickDown={() => changeHour('plus')}
              />
              <TimeButton
                text={meridiem}
                type="meridiem"
                onClickUp={toggleMeridiem}
                onClickDown={toggleMeridiem}
              />
            </div>
            <div className="override">
              <button className="anytimeButton" data-testid="atAnyTimeOverride" onClick={toggleTimeOverride}>{overrideText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeInteractive;
