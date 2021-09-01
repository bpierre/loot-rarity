import occurences from "../data/occurences.json";
import { scoreFromOccurences } from "./utils";
import { rarityDescription, RarityLevel } from "../src";
import rarityLevels from "../src/rarity-levels";

type Occurences = Record<string, number>;

async function main() {
  const levels = Object.values(occurences as Occurences).reduce(
    (levels, occurences) => {
      const level = scoreFromOccurences(occurences);
      levels[level - 1] += occurences;
      return levels;
    },
    [0, 0, 0, 0, 0, 0]
  );

  const total = levels.reduce((total, count) => count + total, 0);
  // NOTE(tvanas): Should this be 8000 * 9? Where does the extra 57 come from.
  if (total !== 72057) {
    throw new Error("Wrong total");
  }

  console.log(" Levels distribution:");
  console.log("");

  levels.forEach((items, index) => {
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
