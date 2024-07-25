import { Critter, TableData, isBug, isFish, isSealife } from './critterTypes';

const sortOrderShadowFish = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Fin', 'Narrow'];
const sortOrderShadowSeaLife = ['XS', 'S', 'M', 'L', 'XL'];
const sortOrderBubbles = ['few', 'regular', 'many'];
const sortOrderSpeed = [
  'none',
  'extra slow',
  'slow',
  'medium',
  'fast',
  'extra fast',
];
const sortOrdersNotes = ['new', 'leaving', 'both'];

const sortNotes = (order: 'ASC' | 'DSC') => {
  const sortOrder = sortOrdersNotes;
  const getNoteValues = (input: TableData) => {
    if (input.notes.leaving && input.notes.new) {
      return 'both';
    }
    if (input.notes.leaving) {
      return 'leaving';
    }
    if (input.notes.new) {
      return 'new';
    }
    return '';
  };

  return (a: TableData, b: TableData) => {
    const aValue = getNoteValues(a);
    const bValue = getNoteValues(b);

    return order === 'ASC'
      ? sortOrder.indexOf(bValue) - sortOrder.indexOf(aValue)
      : sortOrder.indexOf(aValue) - sortOrder.indexOf(bValue);
  };
};

const sortValue = (order: 'ASC' | 'DSC') => {
  return (a: Critter, b: Critter) => {
    return order === 'ASC' ? a.value - b.value : b.value - a.value;
  };
};

const sortName = (order: 'ASC' | 'DSC') => {
  return (a: Critter, b: Critter) => {
    return order === 'ASC'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  };
};

const sortLocation = (order: 'ASC' | 'DSC') => (a: Critter, b: Critter) => {
  if (
    !('location' in a) ||
    !('location' in b) ||
    isSealife(a) ||
    isSealife(b)
  ) {
    throw Error('Tried to use sortLocation on sealife');
  }
  return order === 'ASC'
    ? a.location.localeCompare(b.location)
    : b.location.localeCompare(a.location);
};

const sortShadow = (order: 'ASC' | 'DSC') => {
  let sortOrder;
  return (a: Critter, b: Critter) => {
    if (!('shadow' in a) || !('shadow' in b) || isBug(a) || isBug(b)) {
      throw Error('Tried to use sortLocation on bug');
    }
    sortOrder = isFish(a) ? sortOrderShadowFish : sortOrderShadowSeaLife;
    return order === 'ASC'
      ? sortOrder.indexOf(a.shadow) - sortOrder.indexOf(b.shadow)
      : sortOrder.indexOf(b.shadow) - sortOrder.indexOf(a.shadow);
  };
};

const sortBubbles = (order: 'ASC' | 'DSC') => {
  const sortOrder = sortOrderBubbles;
  return (a: Critter, b: Critter) => {
    if (
      !('bubble' in a) ||
      !('bubble' in b) ||
      !isSealife(a) ||
      !isSealife(b)
    ) {
      throw Error('Tried to use sortBubbles on non-sealife');
    }
    return order === 'ASC'
      ? sortOrder.indexOf(a.bubble) - sortOrder.indexOf(b.bubble)
      : sortOrder.indexOf(b.bubble) - sortOrder.indexOf(a.bubble);
  };
};

const sortSpeed = (order: 'ASC' | 'DSC') => {
  const sortOrder = sortOrderSpeed;
  return (a: Critter, b: Critter) => {
    if (!('speed' in a) || !('speed' in b) || !isSealife(a) || !isSealife(b)) {
      throw Error('Tried to use sortSpeed on non-sealife');
    }
    return order === 'ASC'
      ? sortOrder.indexOf(a.speed) - sortOrder.indexOf(b.speed)
      : sortOrder.indexOf(b.speed) - sortOrder.indexOf(a.speed);
  };
};

type CritterSorting = (a: TableData, b: TableData) => number;

export type SortingType =
  | 'value'
  | 'name'
  | 'location'
  | 'shadow'
  | 'bubbles'
  | 'speed'
  | 'notes'
  | 'pic';

export const sortCritter = (
  type: SortingType,
  order: 'ASC' | 'DSC'
): CritterSorting => {
  switch (type) {
    case 'value':
      return sortValue(order);
    case 'name':
    case 'pic':
      return sortName(order);
    case 'location':
      return sortLocation(order);
    case 'shadow':
      return sortShadow(order);
    case 'bubbles':
      return sortBubbles(order);
    case 'speed':
      return sortSpeed(order);
    case 'notes':
      return sortNotes(order);
    default:
      return () => 0;
  }
};

export const jestCritterDataHelpers = {
  sortName,
  sortValue,
  sortLocation,
  sortBubbles,
  sortSpeed,
  sortShadow,
  sortOrderShadowFish,
  sortOrderShadowSeaLife,
  sortOrderBubbles,
  sortOrderSpeed,
  sortOrdersNotes,
};
