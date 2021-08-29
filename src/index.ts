import itemsRarity from "../data/items-rarity-compact.json";
import { hashItem } from "./hash-item";

export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

export async function itemRarity(itemName: string): Promise<Rarity> {
  const hash = await hashItem(itemName);
  return (Object.entries(itemsRarity).findIndex(([_, items]) => {
    return items.includes(hash);
  }) + 1) as Rarity;
}

export async function rarityColor(
  itemOrRarity: string | Rarity
): Promise<string> {
  const rarity =
    typeof itemOrRarity === "number"
      ? itemOrRarity
      : await itemRarity(itemOrRarity);

  if (rarity === 1) return "#838383"; // common (white)
  if (rarity === 2) return "#00DC82"; // uncommon (green)
  if (rarity === 3) return "#2e82ff"; // rare (blue)
  if (rarity === 4) return  "#c13cff"; // epic (purple)
  if (rarity === 5) return "#f8b73e"; // legendary (orange)
  if (rarity === 6) return "#ff44b7"; // mythic (crimson)

  throw new Error("Wrong rarity passed");
}

export async function rarityDescription(
  itemOrRarity: string | Rarity
): Promise<string> {
  const rarity =
    typeof itemOrRarity === "number"
      ? itemOrRarity
      : await itemRarity(itemOrRarity);

  if (rarity === 1) return "Common";
  if (rarity === 2) return "Uncommon";
  if (rarity === 3) return "Rare";
  if (rarity === 4) return "Epic";
  if (rarity === 5) return "Legendary";
  if (rarity === 6) return "Mythic";

  throw new Error("Wrong rarity passed");
}
