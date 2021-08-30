import type { Rarity } from "./types";

import itemsRarity from "../data/items-rarity-hashes.json";
import { hashItem } from "./hash-item";
import rarityLevels from "./rarity-levels";
import {
  imageRarity,
  imageRarityFromItems,
  itemsFromSvg,
  svgDataUri,
  svgFromItems,
} from "./image";

let cachedItemsrarity = null;

export function itemRarity(itemName: string): Rarity {
  if (!cachedItemsrarity) {
    cachedItemsrarity = itemsRarity.map(
      (items: string) => new Set(items.match(/.{1,5}/g))
    );
  }

  const hash = hashItem(itemName);

  let index = 6;
  while (index--) {
    if (cachedItemsrarity[index].has(hash)) {
      return (index + 1) as Rarity;
    }
  }

  throw new Error(`The item name couldn’t be found: “${itemName}”`);
}

export function rarityColor(itemOrRarity: string | Rarity): string {
  const rarity =
    typeof itemOrRarity === "number" ? itemOrRarity : itemRarity(itemOrRarity);

  const color = rarityLevels[rarity - 1][1];
  if (!color) {
    throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
  }
  return color;
}

export function rarityDescription(itemOrRarity: string | Rarity): string {
  const rarity =
    typeof itemOrRarity === "number" ? itemOrRarity : itemRarity(itemOrRarity);

  const description = rarityLevels[rarity - 1][2];
  if (!description) {
    throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
  }
  return description;
}

export type { Rarity };
export { rarityLevels };
export {
  imageRarity,
  imageRarityFromItems,
  itemsFromSvg,
  svgDataUri,
  svgFromItems,
};
