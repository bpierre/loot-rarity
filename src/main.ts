import type { ColorFn, RarityLevel } from "./types";

import itemsRarity from "../data/items-rarity-hashes.json";
import shortHash from "shorthash2";
import rarityLevels from "./rarity-levels";

let cachedItemsrarity = null;

export function itemRarity(itemName: string): RarityLevel {
  if (!cachedItemsrarity) {
    cachedItemsrarity = itemsRarity.map(
      (items: string) => new Set(items.match(/.{1,5}/g))
    );
  }

  const hash = shortHash(itemName);

  let index = 6;
  while (index--) {
    if (cachedItemsrarity[index].has(hash)) {
      return (index + 1) as RarityLevel;
    }
  }

  throw new Error(`The item name couldn’t be found: “${itemName}”`);
}

export function rarityColor(
  itemOrRarity: string | RarityLevel,
  { colorFn }: { colorFn?: ColorFn } = {}
): string {
  const itemName = typeof itemOrRarity === "string" ? itemOrRarity : null;
  const level = itemName ? itemRarity(itemName) : (itemOrRarity as RarityLevel);

  const color = rarityLevels[level - 1][1];
  if (!color) {
    throw new Error(`Incorrect rarity level or item: ${itemOrRarity}`);
  }
  return (colorFn?.({ color, itemName, level }) || color) as string;
}

export function rarityDescription(itemOrRarity: string | RarityLevel): string {
  const rarity =
    typeof itemOrRarity === "number" ? itemOrRarity : itemRarity(itemOrRarity);

  const description = rarityLevels[rarity - 1][2];
  if (!description) {
    throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
  }
  return description;
}
