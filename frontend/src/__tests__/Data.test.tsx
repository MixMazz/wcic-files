import bugData from '../assets/rawData/bugs.json';
import fishData from '../assets/rawData/fishes.json';
import seaLifeData from '../assets/rawData/seaCritters.json';
import {
  Bug, Critter, Fish, SeaLife, jestCritterDetailTypes as typeDetails,
} from '../utils/critterTypes';
import { jestCritterDataHelpers } from '../utils/sortingHelpers';

const verifySharedValues = (critter: Critter) => {
  expect(critter.name).not.toBeUndefined();
  expect(critter.name).not.toBeUndefined();
  expect(critter.value).not.toBeUndefined();
  expect(critter.value).toBeGreaterThan(0);
  expect(critter.time).not.toBeUndefined();
  expect(critter.time.AM).not.toBeUndefined();
  expect(critter.time.PM).not.toBeUndefined();
  expect(critter.month).not.toBeUndefined();
  expect(critter.month.Northern).not.toBeUndefined();
  expect(critter.month.Southern).not.toBeUndefined();
}

describe('Testing Raw Data Validity', () => {
  it('should verify the format of all bug data', () => {
    for (const bug of Object.values(bugData.bugs as Bug[])) {
      verifySharedValues(bug);

      expect(bug.location).not.toBeUndefined();
    }
  });

  it('should verify the format of all fish data', () => {
    const definedLocations = [...typeDetails.FISH_LOCATION];
    const definedShadowSizes = [...typeDetails.FISH_SHADOW];

    for (const fish of Object.values(fishData.fishes as Fish[])) {
      verifySharedValues(fish);

      expect(fish.location).not.toBeUndefined();
      expect(fish.shadow).not.toBeUndefined();

      expect(definedLocations.indexOf(fish.location)).not.toBe(-1);
      expect(definedShadowSizes.indexOf(fish.shadow)).not.toBe(-1);
    }
  });

  it('should verify the format of all sealife data', () => {
    const definedShadowSizes = [...typeDetails.SEALIFE_SHADOW];
    const definedBubbles = [...typeDetails.SEALIFE_BUBBLE];
    const definedSpeeds = [...typeDetails.SEALIFE_SPEED];

    for (const sealife of Object.values(seaLifeData.sealives as SeaLife[])) {
      verifySharedValues(sealife);

      expect(sealife.shadow).not.toBeUndefined();
      expect(sealife.bubble).not.toBeUndefined();
      expect(sealife.speed).not.toBeUndefined();

      expect(definedShadowSizes.indexOf(sealife.shadow)).not.toBe(-1);
      expect(definedBubbles.indexOf(sealife.bubble)).not.toBe(-1);
      expect(definedSpeeds.indexOf(sealife.speed)).not.toBe(-1);
    }
  });

  it('should verify equal months/offset for all critters', () => {
    const monthsOriginal = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsSouthernOffset = ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];

    const bugs = Object.values(bugData.bugs);
    const fishes = Object.values(fishData.fishes);
    const sealives = Object.values(seaLifeData.sealives);

    const critters = [bugs, fishes, sealives];
    for (const critterType of critters) {
      for (const critter of critterType) {
        for (const i in critter.month.Northern) {
          const northernMonths = critter.month.Northern;
          if (northernMonths.length === 1 && northernMonths[i][0] === 'all year') {
            continue;
          }

          const timePeriod = northernMonths[i];
          for (const j in timePeriod) {
            const index = monthsOriginal.indexOf(timePeriod[j]);
            expect(index).not.toBe(-1);
            const southernEquivalent = monthsSouthernOffset[index];
            const southernMonth = critter.month.Southern[i][j];
            expect(monthsOriginal.indexOf(southernMonth)).not.toBe(-1);
            expect(southernMonth).toBe(southernEquivalent);
          }
        }
      }
    }
  });

  it('should verify critter sorting functions', () => {
    let bugs = [...Object.values(bugData.bugs)] as Bug[];
    let fishes = [...Object.values(fishData.fishes)] as Fish[];
    let sealives = [...Object.values(seaLifeData.sealives)] as SeaLife[];

    // Alphabetic Sorting
    bugs = bugs.sort(jestCritterDataHelpers.sortName('ASC'));
    for (let i = 0; i < bugs.length - 1; i++) {
      expect(bugs[i].name < bugs[i + 1].name).toBe(true);
    }

    fishes = fishes.sort(jestCritterDataHelpers.sortLocation('DSC'));
    for (let i = 0; i < fishes.length - 1; i++) {
      expect(fishes[i].location >= fishes[i + 1].location).toBe(true);
    }

    // Value Sorting
    bugs = bugs.sort(jestCritterDataHelpers.sortValue('ASC'));
    let prevValue = bugs[0].value;
    for (let i = 0; i < bugs.length; i++) {
      expect(bugs[i].value).toBeGreaterThanOrEqual(prevValue);
      prevValue = bugs[i].value;
    }

    bugs = bugs.sort(jestCritterDataHelpers.sortValue('DSC'));
    for (let i = 0; i < bugs.length; i++) {
      expect(bugs[i].value).toBeLessThanOrEqual(prevValue);
      prevValue = bugs[i].value;
    }

    // Shadow Sorting
    const fishShadowOrder = jestCritterDataHelpers.sortOrderShadowFish;
    fishes = fishes.sort(jestCritterDataHelpers.sortShadow('ASC'));
    let prevIndex = fishShadowOrder.indexOf(fishes[0].shadow);
    for (let i = 0; i < fishes.length - 1; i++) {
      const newIndex = fishShadowOrder.indexOf(fishes[i].shadow);
      expect(newIndex).toBeGreaterThanOrEqual(prevIndex);
      prevIndex = newIndex;
    }

    const sealifeShadowOrder = jestCritterDataHelpers.sortOrderShadowSeaLife;
    sealives = sealives.sort(jestCritterDataHelpers.sortShadow('DSC'));
    prevIndex = sealifeShadowOrder.indexOf(sealives[0].shadow);
    for (let i = 0; i < sealives.length - 1; i++) {
      const newIndex = sealifeShadowOrder.indexOf(sealives[i].shadow);
      expect(newIndex).toBeLessThanOrEqual(prevIndex);
      prevIndex = newIndex;
    }

    // SeaLife Specific Sorting
    const bubblesOrder = jestCritterDataHelpers.sortOrderBubbles;
    sealives = sealives.sort(jestCritterDataHelpers.sortBubbles('ASC'));
    prevIndex = bubblesOrder.indexOf(sealives[0].bubble);
    for (let i = 0; i < sealives.length - 1; i++) {
      const newIndex = bubblesOrder.indexOf(sealives[i].bubble);
      expect(newIndex).toBeGreaterThanOrEqual(prevIndex);
      prevIndex = newIndex;
    }

    const speedOrder = jestCritterDataHelpers.sortOrderSpeed;
    sealives = sealives.sort(jestCritterDataHelpers.sortSpeed('DSC'));
    prevIndex = speedOrder.indexOf(sealives[0].speed);
    for (let i = 0; i < sealives.length - 1; i++) {
      const newIndex = speedOrder.indexOf(sealives[i].speed);
      expect(newIndex).toBeLessThanOrEqual(prevIndex);
      prevIndex = newIndex;
    }
  });
});
