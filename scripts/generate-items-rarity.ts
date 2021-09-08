import { hashItem } from "../src/hash-item";
import occurences from "../data/occurences.json";
import { itemLevelFromOccurences } from "./utils";

type Occurences = Record<string, number>;

async function main() {
  const hashedItems = Object.entries(occurences as Occurences).map(
    ([name, occurences]) => [hashItem(name), occurences]
  );

  const uniques = new Set(hashedItems.map(([hash]) => hash)).size;
  if (hashedItems.length !== uniques) {
    // This should never happen except if hash-item.ts is modified
    throw new Error("Collision! Please check src/hash-item.ts");
  }

  const byLevel = hashedItems.reduce(
    (byLevel: string[], [hash, occurences]) => {
      const level = itemLevelFromOccurences(Number(occurences));

      // No need to store common items, unknown items are always common
      if (level === 1) {
        return byLevel;
      }

      // so that e.g. level 2 is at index 0
      const index = level - 2;

      const levelHashes = byLevel[index] ?? "";
      byLevel[index] = levelHashes + hash;
      return byLevel;
    },
    []
  );

  console.log(JSON.stringify(byLevel));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
