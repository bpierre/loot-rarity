import { itemRarity, rarityColor, rarityDescription, Rarity } from "../..";
import loot from "../../data/loot.json";

type ItemRarityInfo = {
  color?: string;
  name: string;
  rarity?: Rarity;
  description?: string;
};

function rarityInfo(name: string): ItemRarityInfo {
  const rarity = itemRarity(name);
  const color = rarityColor(rarity);
  const description = rarityDescription(rarity);
  return { color, description, name, rarity };
}

export function randomBagId() {
  return String(Math.floor(Math.random() * 7999) + 1);
}

export function useBag(
  id: string
): null | { id: string; items: Array<ItemRarityInfo> } {
  const bagId = Number(id);

  if (isNaN(bagId) || bagId < 1 || bagId > 8000) {
    return null;
  }

  const itemNames = Object.values(loot[bagId - 1][bagId]) as string[];

  return {
    id: String(bagId),
    items: itemNames.map(rarityInfo),
  };
}
