export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
export const HEMISPHERES = ['Northern', 'Southern'] as const;
export const MERIDIEMS = ['AM', 'PM'] as const;

export type Hemisphere = (typeof HEMISPHERES)[number];
export type Meridiem = (typeof MERIDIEMS)[number];
export type Month = (typeof MONTHS)[number];

export type CritterType = 'bug' | 'fish' | 'sealife';

type CritterBase = {
  name: string;
  value: number;
  time: {
    AM: number[][];
    PM: number[][];
  };
  month: {
    Northern: string[][];
    Southern: string[][];
  };
  pic: string;
};

export type Bug = CritterBase & {
  type: 'bug';
  location: string;
  rarity: string;
};

const FISH_LOCATION = [
  'Sea',
  'River',
  'Pond',
  'Pier',
  'River (clifftop)',
  'River (mouth)',
  'Sea (rainy days)',
] as const;
const FISH_SHADOW = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'Fin',
  'Narrow',
] as const;

export type Fish = CritterBase & {
  type: 'fish';
  location: (typeof FISH_LOCATION)[number];
  shadow: (typeof FISH_SHADOW)[number];
  rarity: string;
};

const SEALIFE_SHADOW = ['XS', 'S', 'M', 'L', 'XL'] as const;
const SEALIFE_BUBBLE = ['few', 'regular', 'many'] as const;
const SEALIFE_SPEED = [
  'none',
  'extra slow',
  'slow',
  'medium',
  'fast',
  'extra fast',
] as const;

export type SeaLife = CritterBase & {
  type: 'sealife';
  shadow: (typeof SEALIFE_SHADOW)[number];
  bubble: (typeof SEALIFE_BUBBLE)[number];
  speed: (typeof SEALIFE_SPEED)[number];
};

export type Critter = Bug | Fish | SeaLife;

export type DateSimplified = {
  month: Month;
  hemisphere: Hemisphere;
  hour: number;
  meridiem: Meridiem;
};

export type CritterTimeObject = {
  monthsAvailable: {
    Northern: string[];
    Southern: string[];
  };
  hoursAvailable: {
    AM: number[];
    PM: number[];
  };
};

export const jestCritterDetailTypes = {
  FISH_LOCATION,
  FISH_SHADOW,
  SEALIFE_SHADOW,
  SEALIFE_BUBBLE,
  SEALIFE_SPEED,
};

export type Notes = {
  leaving: boolean;
  new: boolean;
};

export type TableData = (Bug | Fish | SeaLife) & { notes: Notes };

export const isBug = (critter: Critter) => critter.type === 'bug';

export const isFish = (critter: Critter) => critter.type === 'fish';

export const isSealife = (critter: Critter) => critter.type === 'sealife';
