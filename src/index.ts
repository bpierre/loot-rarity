import type { Rarity, RarityLevel } from "./types";

import itemsRarity from "../data/items-rarity-hashes.json";
import { hashItem } from "./hash-item";
import rarityLevels from "./rarity-levels";
import {
  imageRarity,
  imageRarityFromItems,
  itemsFromSvg,
  rarityImage,
  rarityImageFromItems,
  svgDataUri,
  svgFromItems,
} from "./image";

let cachedItemsrarity = null;

export function itemRarity(itemName: string): RarityLevel {
  if (!cachedItemsrarity) {
    cachedItemsrarity = itemsRarity.map(
      (items: string) => new Set(items.match(/.{1,5}/g))
    );
  }

  const hash = hashItem(itemName);

  let index = 6;
  while (index--) {
    if (cachedItemsrarity[index].has(hash)) {
      return (index + 1) as RarityLevel;
    }
  }

  throw new Error(`The item name couldn’t be found: “${itemName}”`);
}

export function rarityColor(itemOrRarity: string | RarityLevel): string {
  const rarity =
    typeof itemOrRarity === "number" ? itemOrRarity : itemRarity(itemOrRarity);

  const color = rarityLevels[rarity - 1][1];
  if (!color) {
    throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
  }
  return color;
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

export type { Rarity, RarityLevel };
export { rarityLevels };
export {
  imageRarity,
  imageRarityFromItems,
  itemsFromSvg,
  rarityImage,
  rarityImageFromItems,
  svgDataUri,
  svgFromItems,
};
