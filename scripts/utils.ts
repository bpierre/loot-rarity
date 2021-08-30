import rarityLevels from "../src/rarity-levels";

export function scoreFromOccurences(occurences: number) {
  for (let i = 1, len = rarityLevels.length; i < len; i++) {
    if (occurences > rarityLevels[i][0]) {
      return i;
    }
  }
  return 6;
}
