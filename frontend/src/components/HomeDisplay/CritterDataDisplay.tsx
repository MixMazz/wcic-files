import {
    useCallback, useEffect, useMemo, useState,
  } from 'react';
  import bugData from 'src/rawData/bugs.json';
  import fishData from 'src/rawData/fishes.json';
  import seaLifeData from 'src/rawData/seaCritters.json';
  import { getCurrentAvailable } from 'src/utils/utils';
  import { sortCritter, SortingType } from 'src/utils/sortingHelpers';
  import { TableData, CritterType } from 'src/utils/critterTypes';
  import PriceToggle from 'src/components/HomeDisplay/PriceToggle';
  import CategoryRadio from 'src/components/HomeDisplay/CategoryRadio';
  import CheckboxShowMissing from 'src/components/HomeDisplay/CheckboxShowMissing';
  import CritterTable from 'src/components/HomeDisplay/CritterTable';
  import LoginPrompt from 'src/components/HomeDisplay/LoginPrompt';
  import CompletedInventory from 'src/components/HomeDisplay/CompletedInventory';
  import { useTimeContext } from 'src/contexts/TimeContext';
  import { useUserContext } from 'src/contexts/UserContext';
  import { logEvent } from 'src/logEvents';
  
  const CritterDataDisplay = () => {
    const { loggedInUser } = useUserContext();
    const {
      allDayOverride, hemisphere, month, hour, meridiem,
    } = useTimeContext();
    const [availableBugs, setAvailableBugs] = useState<TableData[]>([]);
    const [availableFish, setAvailableFish] = useState<TableData[]>([]);
    const [availableSeaLife, setAvailableSeaLife] = useState<TableData[]>([]);
  
    const [displayCategory, setDisplayCategory] = useState<CritterType>('bug');
    const [showMissing, setShowMissing] = useState(false);
    const [flickPrices, setFlickPrices] = useState(false);
  
    const [sortStyle, setSortStyle] = useState<'ASC' | 'DSC' | 'none'>('none');
    const [sortType, setSortType] = useState<SortingType | null>(null);
  
    const { bug, fish, sealife } = loggedInUser ?? {};
  
    const getCritters = () => {
      const currentTime = {
        hemisphere,
        month,
        hour,
        meridiem,
      };
      const data = {
        currentTime,
        anytimeOverride: !!allDayOverride,
      };
  
      setAvailableBugs(getCurrentAvailable({
        ...data,
        type: 'bug',
        userInventory: showMissing ? bug : undefined,
      }) as TableData[]);
      setAvailableFish(getCurrentAvailable({
        ...data,
        type: 'fish',
        userInventory: showMissing ? fish : undefined,
      }) as TableData[]);
      setAvailableSeaLife(getCurrentAvailable({
        ...data,
        type: 'sealife',
        userInventory: showMissing ? sealife : undefined,
      }) as TableData[]);
    };
  
    useEffect(() => {
      getCritters();
    }, [hemisphere, month, hour, meridiem, showMissing, bug, fish, sealife, allDayOverride]);
  
    const changeDisplayCategory = useCallback((type: CritterType) => {
      setSortStyle('none');
      setSortType(null);
      setDisplayCategory(type);
  
      logEvent('ChangeCategory', { newCategory: type });
  
      if (type !== 'bug') {
        setFlickPrices(false);
      }
    }, [])
  
    /*
          TODO - simplify to () => setShowMissing(prev => !prev) after
      */
    const changeShowMissing = useCallback(() => {
      setShowMissing((prev) => {
        logEvent('ChangeShowMissing', { checkboxValue: !prev });
        return !prev;
      });
    }, []);
  
    const changeFlickPrices = useCallback(() => {
      setFlickPrices((prev) => {
        logEvent('ChangeFlickPrices', { checkboxValue: !prev });
        return !prev;
      });
    }, []);
  
    const changeSorting = useCallback((type: SortingType) => {
      setSortType((prev) => {
        const prevSortStyle = sortStyle;
        if (prev === type) {
          setSortStyle((prevStyle) => (prevStyle === 'none' ? 'ASC' : prevStyle === 'ASC' ? 'DSC' : 'none'));
        } else {
          setSortStyle('ASC');
        }
  
        if (prevSortStyle === 'DSC') {
          return null;
        }
        return type;
      });
    }, []);
  
    const { currentData, headers } = useMemo(() => {
      let currentData: TableData[] = [];
      let headers: string[] = [];
      switch (displayCategory) {
        case 'bug':
          currentData = [...availableBugs];
          headers = Object.values(bugData.headers);
          break;
        case 'fish':
          currentData = [...availableFish];
          headers = Object.values(fishData.headers);
          break;
        case 'sealife':
          currentData = [...availableSeaLife];
          headers = Object.values(seaLifeData.headers);
          break;
        default:
          break;
      }
  
      if (sortStyle !== 'none' && !!sortType) {
        currentData = [...currentData].sort(sortCritter(sortType, sortStyle));
      }
  
      return { headers, currentData };
    }, [sortType, sortStyle, displayCategory, availableBugs, availableFish, availableSeaLife]);
  
    const showLoginPrompt = showMissing && !loggedInUser;
    const showCompletedScreen = currentData.length === 0;
    const showTable = !showLoginPrompt && !showCompletedScreen;
  
    return (
      <>
        <div className="card shadow">
          <div id="tableSelectors">
            <CategoryRadio
              currentActive={displayCategory}
              handleChange={changeDisplayCategory}
            />
            <div id="tableMinorAdj">
              <CheckboxShowMissing checked={showMissing} handleChange={changeShowMissing} />
              {
                (displayCategory === 'bug') && <PriceToggle checked={flickPrices} handleChange={changeFlickPrices} />
              }
            </div>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          {showLoginPrompt && <LoginPrompt />}
          {showCompletedScreen && <CompletedInventory />}
          {showTable && (
            <CritterTable
              currentHeaders={headers}
              currentData={currentData}
              updateSorting={changeSorting}
              sortType={sortType}
              sortStyle={sortStyle}
              usingFlickPrices={flickPrices}
            />
          )}
        </div>
        <br />
      </>
    );
  }
  
  export default CritterDataDisplay;
  