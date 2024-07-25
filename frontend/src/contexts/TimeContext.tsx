import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import { getCurrentTime, isNightTime, isWinterTime } from 'src/utils/utils';
import {
  Hemisphere, MONTHS, Meridiem, Month,
} from 'src/utils/critterTypes';

export interface ICurrentTime {
  hemisphere: Hemisphere;
  month: Month;
  hour: number;
  meridiem: Meridiem;
  allDayOverride?: boolean;
  changeMonth: (dir: 'plus' | 'minus') => void;
  changeHour: (dir: 'plus' | 'minus') => void;
  toggleMeridiem: () => void;
  toggleHemisphere: () => void;
  toggleTimeOverride: () => void;
  setToRealTime: () => void;
  setHemisphere: React.Dispatch<React.SetStateAction<Hemisphere>>;
}

export const TimeContext = createContext<ICurrentTime | null>(null);

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTimeContext must be used with a TimeProvider');
  }
  return context;
};

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hemisphere, setHemisphere] = useState<Hemisphere>('Northern');
  const [month, setMonth] = useState<Month>('January');
  const [hour, setHour] = useState(12);
  const [meridiem, setMeridiem] = useState<Meridiem>('PM');
  const [allDayOverride, setAllDayOverride] = useState(false);

  const changeMonth = useCallback((dir: 'plus' | 'minus') => {
    setMonth((prev) => {
      const monthIndex = MONTHS.indexOf(prev);
      if (dir === 'plus') {
        return (monthIndex === 11) ? MONTHS[0] : MONTHS[monthIndex + 1];
      } else {
        return (monthIndex === 0) ? MONTHS[11] : MONTHS[monthIndex - 1];
      }
    });
  }, []);

  const changeHour = useCallback((dir: 'plus' | 'minus') => {
    setHour((prev) => {
      if (dir === 'plus') {
        return (prev >= 12) ? 1 : prev + 1;
      } else {
        return (prev <= 1) ? 12 : prev - 1;
      }
    });
  }, []);

  const toggleMeridiem = useCallback(() => {
    setMeridiem((prev) => ((prev === 'AM') ? 'PM' : 'AM'));
  }, []);

  const toggleHemisphere = useCallback(() => {
    setHemisphere((prev) => {
      const newHemisphere = (prev === 'Northern') ? 'Southern' : 'Northern';
      localStorage?.setItem('wcicHemisphere', newHemisphere);
      return newHemisphere;
    });
  }, []);

  const toggleTimeOverride = useCallback(() => {
    setAllDayOverride((prev) => !prev);
  }, []);

  const setToRealTime = useCallback(() => {
    const rightNow = getCurrentTime();
    setMonth(rightNow.month);
    setHour(rightNow.hour);
    setMeridiem(rightNow.meridiem);
  }, []);

  useEffect(() => {
    const savedHemisphere = localStorage?.getItem('wcicHemisphere');
    if (savedHemisphere && (savedHemisphere === 'Northern' || savedHemisphere === 'Southern')) {
      setHemisphere(savedHemisphere);
    }

    setToRealTime();
  }, [])


  useEffect(() => {
    if (isNightTime(hour, meridiem)) {
      document.body.classList.add('nightTime');
    } else {
      document.body.classList.remove('nightTime');
    }
  }, [hour, meridiem]);

  useEffect(() => {
    if (isWinterTime(month, hemisphere)) {
      document.body.classList.add('winterTime');
    } else {
      document.body.classList.remove('winterTime');
    }
  }, [month, hemisphere]);


  const value = useMemo(() => ({
    hemisphere,
    month,
    hour,
    meridiem,
    allDayOverride,
    changeMonth,
    changeHour,
    toggleHemisphere,
    toggleMeridiem,
    toggleTimeOverride,
    setToRealTime,
    setHemisphere,
  }), [hemisphere, month, hour, meridiem, allDayOverride,
    changeMonth, changeHour, toggleHemisphere, toggleMeridiem, toggleTimeOverride,
    setToRealTime, setHemisphere,
  ]);

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};
