// Index 0: each item rarity level is defined using a number that represents
// the maximum number of occurences required to be in that level.
//
// Index 1: each loot rarity level is defined using a number that represents
// the minimum number of its items levels summed.
//
// See scripts/generate-items-rarity.ts to see how it is used.
export default [
  [-1, 0, "#838383", "Common"],
  [374, 17, "#00DC82", "Uncommon"],
  [357, 20, "#2e82ff", "Rare"],
  [100, 23, "#c13cff", "Epic"],
  [9, 26, "#f8b73e", "Legendary"],
  [1, 29, "#ff44b7", "Mythic"],
] as Array<
  [
    itemOccurrencesThreshold: number,
    bagScoreThreshold: number,
    color: string,
    name: string
  ]
>;
