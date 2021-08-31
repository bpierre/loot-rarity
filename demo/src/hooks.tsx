import {
  ColorFnParameters,
  rarityColor,
  rarityDescription,
  rarityImageFromItems,
} from "../..";
import loot from "../../data/loot.json";

type ItemRarityInfo = {
  color?: string;
  name: string;
  description?: string;
};

function colorFn({ itemName }: ColorFnParameters) {
  // const name = itemName?.toLowerCase() ?? "";
  // if (name.includes("divine robe")) return "crimson";
  // if (name.includes("divine")) return "cyan";
}

function rarityInfo(name: string): ItemRarityInfo {
  const color = rarityColor(name, { colorFn });
  const description = rarityDescription(name);
  return { color, description, name };
}

export function randomBagId() {
  return String(Math.floor(Math.random() * 7999) + 1);
}

export function useBag(
  id: string
): null | { id: string; items: Array<ItemRarityInfo>; image: string } {
  const bagId = Number(id);

  if (isNaN(bagId) || bagId < 1 || bagId > 8000) {
    return null;
  }

  const itemNames = Object.values(loot[bagId - 1][bagId]) as string[];

  return {
    id: String(bagId),
    image: rarityImageFromItems(itemNames, { colorFn }),
    items: itemNames.map(rarityInfo),
  };
}
