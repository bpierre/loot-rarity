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

  if (rarity === 1) return "#ffffff"; // common (white)
  if (rarity === 2) return "#00fe01"; // uncommon (green)
  if (rarity === 3) return "#66a0e6"; // rare (blue)
  if (rarity === 4) return "#9900fe"; // epic (purple)
  if (rarity === 5) return "#df923c"; // legendary (orange)
  if (rarity === 6) return "#e06467"; // mythic (crimson)

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
