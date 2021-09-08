import occurences from "../data/occurences.json";
import loot from "../data/loot.json";
import { itemLevelFromOccurences } from "./utils";
import { rarityDescription, lootRarity, RarityLevel } from "../src";
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
      const level = lootRarity(bag.items);
      levelCounts[level - 1]++;
      return levelCounts;
    },
    [0, 0, 0, 0, 0, 0]
  );

  console.log(" Bag levels distribution:");
  console.log("");
  console.log(
    bagLevels
      .map((value, index) => {
        const percentage = Math.round((value / 8000) * 10000) / 100;
        const description = rarityDescription((index + 1) as RarityLevel);
        const itemsScoreThreshold = rarityLevels[index][1];

        const levelLabel = `${description}:`.padEnd(12);
        const percentageLabel = `${percentage}%`.padStart(8);
        const thresholdLabel = `score above ${String(itemsScoreThreshold).padStart(2)}`.padStart(9);
        const groupTotalLabel = `(${bagLevels[index]} bags)`.padStart(13)

        return ` ${levelLabel}${thresholdLabel}${percentageLabel}${groupTotalLabel}`;
      })
      .join("\n")
  );
  console.log("");

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

    let thresholdLabel = `below ${String(threshold + 1).padStart(3)} occurences`;
    if (threshold === -1)
      thresholdLabel = `above ${rarityLevels[1][0]} occurences`;
    if (threshold === 1) thresholdLabel = "unique";

    console.log(
      " " +
        `${description}:`.padEnd(11) +
        `${thresholdLabel}`.padStart(21) +
        `${percentage}%`.padStart(8) +
        ` (${items} items)`.padStart(15)
    );
  });

  console.log("");
  console.log(
    " Update src/rarity-levels.ts to tweak the distribution thresholds."
  );
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
