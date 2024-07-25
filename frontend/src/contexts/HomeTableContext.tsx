import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CritterType, TableData } from "src/utils/critterTypes";
import { SortingType, sortCritter } from "src/utils/sortingHelpers";
import { useTimeContext } from "./TimeContext";
import { getCurrentAvailable } from "src/utils/utils";
import { useUserContext } from "./UserContext";
import bugData from 'src/assets/rawData/bugs.json';
import fishData from 'src/assets/rawData/fishes.json';
import seaLifeData from 'src/assets/rawData/seaCritters.json';

export interface IHomeTable {
  headers: string[];
  currentData: TableData[];

  displayCategory: CritterType,
  showMissing: boolean,
  setShowMissing: React.Dispatch<React.SetStateAction<boolean>>,
  flickPrices: boolean,
  setFlickPrices: React.Dispatch<React.SetStateAction<boolean>>,

  sortStyle: "ASC" | "DSC" | "none";
  sortType: SortingType | null;

  changeSorting: (type: SortingType) => void;
  changeDisplayCategory: (type: CritterType) => void;
}

export const HomeTableContext = createContext<IHomeTable | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(HomeTableContext);
  if (!context) {
    throw new Error('useTableContext must be used in a HomeTableProvider');
  }
  return context;
}

export const HomeTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loggedInUser } = useUserContext();
  const { hemisphere, month, hour, meridiem, allDayOverride } = useTimeContext();

  const { bug, fish, sealife } = loggedInUser ?? {};

  const [availableBugs, setAvailableBugs] = useState<TableData[]>([]);
  const [availableFish, setAvailableFish] = useState<TableData[]>([]);
  const [availableSeaLife, setAvailableSeaLife] = useState<TableData[]>([]);

  const [displayCategory, setDisplayCategory] = useState<CritterType>('bug');
  const [showMissing, setShowMissing] = useState(false);
  const [flickPrices, setFlickPrices] = useState(false);

  const [sortStyle, setSortStyle] = useState<'ASC' | 'DSC' | 'none'>('none');
  const [sortType, setSortType] = useState<SortingType | null>(null);


  const getCritters = () => {
    const data = {
      currentTime: {
        hemisphere,
        month,
        hour,
        meridiem,
      },
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

  const changeDisplayCategory = useCallback((type: CritterType) => {
    setSortStyle('none');
    setSortType(null);
    setDisplayCategory(type);

    if (type !== 'bug') {
      setFlickPrices(false);
    }
  }, [])

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

  useEffect(() => {
    getCritters();
  }, [hemisphere, month, hour, meridiem, showMissing, bug, fish, sealife, allDayOverride]);

  const value: IHomeTable = {
    displayCategory,
    showMissing,
    setShowMissing,
    flickPrices,
    setFlickPrices,
    sortStyle,
    sortType,
    changeSorting,
    changeDisplayCategory,
    headers,
    currentData,
  };

  return (
    <HomeTableContext.Provider value={value}>
      {children}
    </HomeTableContext.Provider>
  )
}

export default HomeTableProvider;