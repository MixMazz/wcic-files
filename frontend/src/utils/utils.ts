import bugData from 'src/assets/rawData/bugs.json';
import fishData from 'src/assets/rawData/fishes.json';
import sealifeData from 'src/assets/rawData/seaCritters.json';
import {
  Bug,
  CritterType,
  Critter,
  CritterTimeObject,
  DateSimplified,
  Fish,
  HEMISPHERES,
  Hemisphere,
  MERIDIEMS,
  MONTHS,
  Meridiem,
  Month,
  Notes,
  SeaLife,
  TableData,
} from 'src/utils/critterTypes';

export const flickMultiplier = 1.5;

export function checkIsLeavingSoon(currentMonth: Month, critterMonths: string[]) {
  const thisMonthIndex = MONTHS.indexOf(currentMonth);
  const nextMonth = thisMonthIndex === 11 ? MONTHS[0] : MONTHS[thisMonthIndex + 1];
  return critterMonths.indexOf(nextMonth) === -1;
}

export function checkIsNewThisMonth(currentMonth: Month, critterMonths: string[]) {
  const thisMonthIndex = MONTHS.indexOf(currentMonth);
  const nextMonth = thisMonthIndex === 0 ? MONTHS[11] : MONTHS[thisMonthIndex - 1];

  return critterMonths.indexOf(nextMonth) === -1;
}

const monthCache: { [key: string]: string[] } = {};
const timeCache: { [key: string]: number[] } = {};

export function getAvailableTime(critter: Critter) {
  const hours: { 'AM': number[], 'PM': number[] } = {
    AM: [],
    PM: [],
  };

  for (const i in MERIDIEMS) {
    const period = MERIDIEMS[i];
    for (const j in critter.time[period]) {
      const timeFrame = critter.time[period][j];

      if (timeFrame.length === 1) {
        hours[period].push(timeFrame[0]);
      } else {
        const startTime = timeFrame[0];
        const endTime = timeFrame[1];

        const timeKey = `time${startTime}_${endTime}`;

        if (timeCache[timeKey]) {
          hours[period] = [...timeCache[timeKey]];
          continue;
        }

        let startPos;

        if (startTime === 12) {
          hours[period].push(startTime);
          startPos = 1;
        } else {
          startPos = startTime;
        }

        for (let k = startPos; k <= endTime; k++) {
          hours[period].push(k);
        }

        timeCache[timeKey] = [...hours[period]];
      }
    }
  }

  return hours;
}

export function getAvailableMonths(critter: Critter) {
  const critterMonths: { 'Northern': string[], 'Southern': string[] } = {
    Northern: [],
    Southern: [],
  };

  for (const i in HEMISPHERES) {
    const hemi = HEMISPHERES[i];
    const monthRanges = critter.month[HEMISPHERES[i]];

    for (const j in monthRanges) {
      const thisRange = monthRanges[j];

      if (thisRange.length === 1) {
        critterMonths[hemi].push(thisRange[0]);
      } else {
        const startMonth = thisRange[0] as Month;
        const endMonth = thisRange[1];

        const monthKey = startMonth + endMonth;

        if (monthCache[monthKey]) {
          critterMonths[hemi] = [...monthCache[monthKey]];
          continue;
        }

        const startingIndex = MONTHS.indexOf(startMonth);

        let stillSearching = true;
        let runningIndex = startingIndex;
        while (stillSearching) {
          if (MONTHS[runningIndex] !== endMonth) {
            critterMonths[hemi].push(MONTHS[runningIndex]);
            runningIndex++;
            if (runningIndex === MONTHS.length) {
              runningIndex = 0;
            }
          } else {
            stillSearching = false;
            critterMonths[hemi].push(endMonth);
          }
        }

        monthCache[monthKey] = [...critterMonths[hemi]];
      }
    }
  }

  return critterMonths;
}

export function getAllTimeData(critters: Critter[]) {
  const timeData: CritterTimeObject[] = [];

  for (let i = 0; i < critters.length; i++) {
    timeData.push({
      monthsAvailable: getAvailableMonths(critters[i]),
      hoursAvailable: getAvailableTime(critters[i]),
    });
  }

  return timeData;
}

const critterTimeData = {
  bug: getAllTimeData(Object.values(bugData.bugs as Bug[])),
  fish: getAllTimeData(Object.values(fishData.fishes as Fish[])),
  sealife: getAllTimeData(Object.values(sealifeData.sealives as SeaLife[])),
};

interface ICurrentAvailableProps {
  type: CritterType,
  currentTime: DateSimplified,
  anytimeOverride: boolean,
  userInventory?: string
}

export function getCurrentAvailable({
  type, currentTime, anytimeOverride, userInventory,
}: ICurrentAvailableProps): TableData[] {
  const critters = type === 'bug'
    ? (Object.values(bugData.bugs as Bug[]))
    : type === 'fish'
      ? (Object.values(fishData.fishes as Fish[]))
      : (Object.values(sealifeData.sealives as SeaLife[]));

  const timeData = critterTimeData[type];
  const availableCritters: TableData[] = [];

  for (let i = 0; i < timeData.length; i++) {
    if (userInventory && userInventory[i] === '1') {
      continue;
    }

    const allMonths = timeData[i].monthsAvailable[currentTime.hemisphere];
    const allTimes = timeData[i].hoursAvailable[currentTime.meridiem];

    const availableYearRound = allMonths.length === 1 && allMonths[0] === 'all year';

    if ((allMonths.indexOf(currentTime.month) !== -1) || availableYearRound) {
      const newNote = {
        leaving: false,
        new: false,
      } as Notes;

      if (!availableYearRound) {
        newNote.leaving = checkIsLeavingSoon(currentTime.month, allMonths);
        newNote.new = checkIsNewThisMonth(currentTime.month, allMonths);
      }

      if (anytimeOverride) {
        availableCritters.push({ ...critters[i], notes: newNote });
      } else {
        if (allTimes.indexOf(currentTime.hour) !== -1) {
          availableCritters.push({ ...critters[i], notes: newNote });
        }
      }
    }
  }

  return availableCritters;
}

export function getCurrentTime(hemisphere?: Hemisphere): DateSimplified {
  const rightNow = new Date();
  const theHour = rightNow.getHours();

  return {
    month: MONTHS[rightNow.getMonth()],
    hour: theHour > 12 ? theHour - 12 : theHour === 0 ? 12 : theHour,
    meridiem: theHour >= 12 ? 'PM' : 'AM',
    hemisphere: hemisphere ?? 'Northern',
  };
}

export function isNightTime(hour: number, meridiem: Meridiem) {
  const isLateEvening = meridiem === 'PM' && (hour >= 9 && hour !== 12);
  const isEarlyMorning = meridiem === 'AM' && (hour <= 5 || hour === 12);

  return (isLateEvening || isEarlyMorning);
}

export function isWinterTime(month: Month, hemisphere: Hemisphere) {
  const winterMonths = {
    Northern: ['November', 'December', 'January', 'February'],
    Southern: ['May', 'June', 'July', 'August'],
  };

  const isWithinWinterMonths = winterMonths[hemisphere].indexOf(month) !== -1;

  return isWithinWinterMonths;
}
