export type ColourTheme =
  | 'standard'
  | 'standardnight'
  | 'winter'
  | 'winternight';
export const BannerThemeColours: Record<string, Record<ColourTheme, string>> = {
  waveshoreline: {
    standard: '#EFF5EF',
    standardnight: '#C8E1F9',
    winter: '#E7EBDC',
    winternight: '#AACCFF',
  },
  sky: {
    standard: '#A5D8E9',
    standardnight: '#1F356E',
    winter: '#C1CDD1',
    winternight: '#1F356E',
  },
  bank: {
    standard: '#FEC283',
    standardnight: '#756076',
    winter: '#E4C79B',
    winternight: '#746F82',
  },
  grass: {
    standard: '#7CB266',
    standardnight: '#39514F',
    winter: '#E4E5E7',
    winternight: '#8BA9FD',
  },
  sandfill: {
    standard: '#FDD78B',
    standardnight: '#7A758F',
    winter: '#E8D9B5',
    winternight: '#A5B6E3',
  },
  frondA: {
    standard: '#26A848',
    standardnight: '#053827',
    winter: '#7EB9A0',
    winternight: '#7EB9A0',
  },
  frondB: {
    standard: '#28B34C',
    standardnight: '#0C462E',
    winter: '#7EB9A0',
    winternight: '#0C462E',
  },
  trunkBase: {
    standard: '#F1B24B',
    standardnight: '#545420',
    winter: '#DAB684',
    winternight: '#545420',
  },
  palmSnowPile: {
    standard: '#E4E5E7',
    standardnight: '#ABC1FF',
    winter: '#E4E5E7',
    winternight: '#ABC1FF',
  },
};
