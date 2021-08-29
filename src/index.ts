import itemsRarity from "../data/items-rarity-hashes.json";
import { hashItem } from "./hash-item";

export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

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

  if (rarity === 1) return "#838383"; // common (grey)
  if (rarity === 2) return "#00DC82"; // uncommon (green)
  if (rarity === 3) return "#2e82ff"; // rare (blue)
  if (rarity === 4) return "#c13cff"; // epic (purple)
  if (rarity === 5) return "#f8b73e"; // legendary (orange)
  if (rarity === 6) return "#ff44b7"; // mythic (crimson)

  throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
}

export function rarityDescription(itemOrRarity: string | Rarity): string {
  const rarity =
    typeof itemOrRarity === "number" ? itemOrRarity : itemRarity(itemOrRarity);

  if (rarity === 1) return "Common";
  if (rarity === 2) return "Uncommon";
  if (rarity === 3) return "Rare";
  if (rarity === 4) return "Epic";
  if (rarity === 5) return "Legendary";
  if (rarity === 6) return "Mythic";

  throw new Error(`Incorrect rarity passed: ${itemOrRarity}`);
}
