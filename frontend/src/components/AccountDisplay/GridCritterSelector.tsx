import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import * as UserApi from 'src/network/user_api';
import bugData from 'src/assets/rawData/bugs.json';
import fishData from 'src/assets/rawData/fishes.json';
import sealifeData from 'src/assets/rawData/seaCritters.json';
import { useUserContext } from 'src/contexts/UserContext';
import { UnauthorizedError } from 'src/errors/http_errors';
import {
  Bug, CritterType, Critter, Fish, SeaLife,
} from 'src/utils/critterTypes';

const getFillerIconSVG = (type: CritterType) => {
  switch (type) {
    case 'bug':
      return <path className="checkboxFillerIcon" d="M87.7431 50.5859C94.1259 58.8101 85.6156 68.9693 78.9964 73.5651C81.8332 78.161 81.124 83.2406 78.9964 84.9338C76.8689 86.627 69.0678 87.1107 63.867 78.8866C58.6663 86.8689 51.5744 86.8689 48.974 84.9338L48.9612 84.9242C46.8028 83.318 44.7264 81.7729 48.5012 73.5651C39.5182 68.2436 34.7902 55.9074 40.4637 49.8603C45.6044 44.3811 56.0659 50.5859 59.3755 53.7304C59.8483 49.8603 56.4017 46.2659 55.5931 45.9901C54.1748 45.5063 48.974 46.232 49.6832 43.0875C50.3924 39.9429 57.0115 40.9105 58.9027 42.3618C60.7939 43.8131 62.6851 44.5388 63.867 53.0048C64.1034 50.2634 65.38 44.2969 68.595 42.3618C72.6137 39.9429 77.1053 41.3942 77.5781 43.5712C78.0509 45.7482 72.6137 45.5063 71.4317 46.232C70.2498 46.9576 69.0678 48.6508 68.595 53.7304C69.5406 52.7629 81.3604 42.3618 87.7431 50.5859Z" />;
    case 'fish':
      return <path className="checkboxFillerIcon" fillRule="evenodd" clipRule="evenodd" d="M59.8858 48.0261C47.6486 48.0261 38 53.8337 38 62.0611C38 70.2886 48.5899 79 58.0031 79C67.4164 79 77.5356 71.9825 78.7123 67.8687C80.5949 74.4023 86.9489 75.6122 87.8902 75.6122C88.8315 75.6122 92.1262 75.1283 87.8902 68.5947C84.231 62.9508 86.5425 59.6543 88.3017 57.1454C88.579 56.7499 88.8425 56.374 89.0669 56.0115C90.7142 53.3497 89.0669 49.478 83.6542 52.6238C82.2017 53.468 81.0656 55.0436 79.6536 57.4634C78.0063 53.9143 72.5937 47.5421 59.8858 48.0261ZM47.1779 63.271C49.1275 63.271 50.7079 61.4293 50.7079 59.1573C50.7079 56.8854 49.1275 55.0436 47.1779 55.0436C45.2284 55.0436 43.6479 56.8854 43.6479 59.1573C43.6479 61.4293 45.2284 63.271 47.1779 63.271Z" />;
    case 'sealife':
      return <path className="checkboxFillerIcon" fillRule="evenodd" clipRule="evenodd" d="M63.3832 39C51.7066 39 45.1677 46.6513 45.1677 55.4982C45.1677 64.3451 51.9401 69.1271 52.8743 69.1271C46.1018 69.1271 44 74.3874 44 77.4958C44 81.3215 48.4371 86.5818 51.006 85.8645C51.8501 85.4941 51.5112 84.1675 51.1467 82.7406C50.8052 81.4039 50.4412 79.9791 51.006 79.1695C52.0632 77.6542 53.1203 77.3148 53.8309 77.0867C53.9051 77.0628 53.9756 77.0402 54.0419 77.0176C51.9401 85.1471 59.4132 89.3827 60.8144 88.9728C62.1122 88.5932 61.7909 85.1993 61.6033 83.2183C61.5546 82.7042 61.515 82.2852 61.515 82.0388C61.515 81.9377 61.5133 81.8264 61.5115 81.7073C61.4922 80.4174 61.4591 78.2131 63.3832 78.2131C65.485 78.2131 65.9521 81.3215 65.485 82.517C65.018 83.7125 64.5509 87.06 65.485 88.4946C66.4192 89.9292 74.5928 86.3427 72.7245 77.0176C72.8042 77.0584 72.8907 77.1009 72.9825 77.1461C73.9672 77.6303 75.5668 78.417 75.994 80.6042C76.098 81.1364 75.9068 81.8997 75.7033 82.7122C75.4241 83.8271 75.1217 85.0346 75.5269 85.8645C77.1617 86.5818 82.7665 82.7561 83 77.0176C83 69.8445 75.994 69.1271 74.1257 69.1271C80.6647 64.8233 81.5988 57.1719 81.5988 55.4982C81.5988 53.8245 80.8982 39 63.3832 39ZM60.3473 68.4098C60.3473 70.1265 59.0926 71.5182 57.5449 71.5182C55.9972 71.5182 54.7425 70.1265 54.7425 68.4098C54.7425 66.6931 55.9972 65.3015 57.5449 65.3015C59.0926 65.3015 60.3473 66.6931 60.3473 68.4098ZM72.024 68.4098C72.024 70.1265 70.7693 71.5182 69.2216 71.5182C67.6738 71.5182 66.4192 70.1265 66.4192 68.4098C66.4192 66.6931 67.6738 65.3015 69.2216 65.3015C70.7693 65.3015 72.024 66.6931 72.024 68.4098Z" />;
    default:
      throw new Error(`Invalid Critter type , ${type}`);
  }
};

const CritterCheckbox: React.FC<{
  critter: Critter,
  fillerIcon: JSX.Element,
  handleChange: () => void,
  isChecked: boolean,
}> = ({
  critter, fillerIcon, handleChange, isChecked,
}) => {
    let { name } = critter;
    name = name.replace(/[\s']+/g, '').toLowerCase();

    return (
      <label className={`checkboxLabel ${isChecked ? 'checked' : ''}`} key={name}>
        <input className="checkboxInput" type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className="checkboxName">{critter.name}</span>
        <svg className="checkboxSVG" width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          {fillerIcon}
        </svg>
        <img className="checkboxImg" src={critter.pic} alt="" />
      </label>
    );
  };

type SelectorFieldsetProps = {
  type: CritterType,
  listView?: boolean,
};

const GridCritterSelector: React.FC<SelectorFieldsetProps> = ({
  type,
  listView,
}) => {
  const { loggedInUser, updateUser } = useUserContext();
  const [checkedboxes, setCheckedBoxes] = useState<number[]>([]);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string }>();

  const { label, critterData, buttonLabel } = useMemo(() => {
    switch (type) {
      case 'bug':
        return {
          label: 'Bugs',
          critterData: Object.values(bugData.bugs as Bug[]),
          buttonLabel: 'Save Bugs',
        };
      case 'fish':
        return {
          label: 'Fishes',
          critterData: Object.values(fishData.fishes as Fish[]),
          buttonLabel: 'Save Fish',
        };
      case 'sealife':
        return {
          label: 'Sealife',
          critterData: Object.values(sealifeData.sealives as SeaLife[]),
          buttonLabel: 'Save Sealife',
        };
      default:
        throw new Error(`Invalid grid critter type: ${type}`);
    }
  }, [type]);

  const matchDataToSaved = () => {
    if (loggedInUser) {
      const currentUserInventory = loggedInUser[type];
      const boxes = [];
      for (const i of currentUserInventory) {
        boxes.push(parseInt(i, 10));
      }
      setCheckedBoxes(boxes);
    }
  };

  const resetSelections = () => {
    matchDataToSaved();
    setMessage(undefined);
  };

  const affectAll = (action: 'select' | 'clear') => {
    const newData: number[] = [];
    const value = action === 'select' ? 1 : 0;
    const neededLength = type === 'sealife' ? 40 : 80;

    for (let i = 0; i < neededLength; i++) {
      newData.push(value);
    }

    setCheckedBoxes(newData);
    setMessage(undefined);
  };

  useEffect(() => {
    matchDataToSaved();
  }, [loggedInUser?.[type]]);

  const handleChange = (index: number) => {
    setMessage(undefined);
    setCheckedBoxes((prev) => {
      const newBoxes = [...prev];
      const lastVal = newBoxes[index];
      newBoxes[index] = lastVal === 0 ? 1 : 0;
      return newBoxes;
    });
  };

  const submitNewCritterString = useCallback(async () => {
    if (!loggedInUser) {
      return;
    }

    const encodedString = checkedboxes.join('');
    if (encodedString === loggedInUser?.[type]) {
      return;
    }

    try {
      const updatedUser = await UserApi.changeCritterData(type, { encodedString });
      setMessage({ type: 'success', text: 'Success!' });
      updateUser(updatedUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setMessage({ type: 'error', text: error.message });
      } else {
        alert(error);
      }
    }
  }, [checkedboxes, loggedInUser]);

  return (
    <fieldset>
      <legend>
        <label>{label}</label>
        <button className="secondaryButtonAlt shadow changeAllButton" onClick={() => affectAll('select')}>Select All</button>
        <button className="secondaryButtonAlt shadow changeAllButton" onClick={() => affectAll('clear')}>Clear All</button>
      </legend>
      <div className={`checkboxContainer ${listView ? 'listView' : ''} checkbox${type}`}>
        {
          critterData.map((critter, index) => (
            <CritterCheckbox key={`checkbox${type}${index}`} {...{
              critter,
              fillerIcon: getFillerIconSVG(type),
              handleChange: () => handleChange(index),
              isChecked: checkedboxes[index] === 1,
            }}
            />
          ))
        }
      </div>
      <div className="endButtons">
        {
          message && <span className={message.type === 'success' ? 'successMessage' : 'errorMessage'}>{message.text}</span>
        }
        <button className="secondaryButtonAlt shadow resetButton" onClick={resetSelections}>Reset</button>
        <button onClick={submitNewCritterString} className="primaryButtonAlt shadow saveButton">{buttonLabel}</button>
      </div>
    </fieldset>
  );
};

export default GridCritterSelector;
