// Each rarity level is defined using a number that represents the maximum
// number of occurences required to be in that level.
// See scripts/generate-items-rarity.ts to see how it is used.
export default [
  [-1, "#c0c0c0", "Common"],
  [374, "#00DC82", "Uncommon"],
  [357, "#2e82ff", "Rare"],
  [100, "#c13cff", "Epic"],
  [9, "#f8b73e", "Legendary"],
  [1, "#ff44b7", "Mythic"],
] as Array<[number, string, string]>;
