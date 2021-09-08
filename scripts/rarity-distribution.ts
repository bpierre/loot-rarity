import occurences from "../data/occurences.json";
import loot from "../data/loot.json";
import { itemLevelFromOccurences } from "./utils";
import { rarityDescription, bagRarity, RarityLevel } from "../src";
import rarityLevels from "../src/rarity-levels";

type Occurences = Record<string, number>;

const bags = loot.map((loot, index) => {
  const [items] = Object.values(loot);
  return {
    id: String(index + 1),
    items: Object.values(items as Record<string, string>),
  };
}) as Array<{ id: string; items: string[] }>;

async function main() {
  const bagLevels = bags.reduce(
    (levelCounts, bag) => {
      const level = bagRarity(bag.items);
      levelCounts[level - 1]++;
      return levelCounts;
    },
    [0, 0, 0, 0, 0, 0]
  );

  console.log(
    bagLevels
      .map((value, index) => {
        const percentage = Math.round((value / 8000) * 10000) / 100;
        return `Level ${index + 1} bags: ${percentage}%`;
      })
      .join("\n")
  );

  return;

  const itemsLevels = Object.values(occurences as Occurences).reduce(
    (levels, occurences) => {
      const level = itemLevelFromOccurences(occurences);
      levels[level - 1] += occurences;
      return levels;
    },
    [0, 0, 0, 0, 0, 0]
  );

  const total = itemsLevels.reduce((total, count) => count + total, 0);
  if (total !== 8000 * 8) {
    throw new Error("Wrong total");
  }

  console.log(" Item levels distribution:");
  console.log("");

  itemsLevels.forEach((items, index) => {
    const description = rarityDescription((index + 1) as RarityLevel);
    const percentage = Math.round((items / total) * 10000) / 100;
    const threshold = rarityLevels[index][0];

    let thresholdLabel = `${threshold} or less`;
    if (threshold === -1) thresholdLabel = `above ${rarityLevels[1][0]}`;
    if (threshold === 1) thresholdLabel = "exactly 1";

    console.log(
      " " +
        `${description}:`.padEnd(11) +
        `${thresholdLabel}`.padStart(12) +
        `${percentage}%`.padStart(10) +
        ` (${items} items)`.padStart(14)
    );
  });

  console.log("");
  console.log(" Update src/rarity-levels.ts to tweak the distribution.");
  console.log("");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
