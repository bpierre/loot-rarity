import type { Guild } from "./guilds";

import { rarityImageFromItems } from "../..";
import loot from "../../data/loot.json";

export function useBag(
  id: string,
  guilds: Guild[],
  {
    displayColors,
    displayLevels,
  }: { displayColors: boolean; displayLevels: boolean }
): null | { id: string; image: string } {
  const bagId = Number(id);

  if (isNaN(bagId) || bagId < 1 || bagId > 8000) {
    return null;
  }

  const itemNames = Object.values(loot[bagId - 1][bagId]) as string[];

  return {
    id: String(bagId),
    image: rarityImageFromItems(itemNames, {
      displayLevels: displayLevels && displayColors,
      colorFn({ itemName }) {
        if (!displayColors) {
          return 'white'
        }
        for (const { match, color } of guilds) {
          if (match(itemName ?? "")) {
            return color;
          }
        }
      },
    }),
  };
}
