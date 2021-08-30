import { hashItem } from "../src/hash-item";
import occurences from "../data/occurences.json";
import { scoreFromOccurences } from "./utils";

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

  const byScore = hashedItems.reduce(
    (byScore: string[], [hash, occurences]) => {
      const score = scoreFromOccurences(Number(occurences));
      const scoreHashes = byScore[score - 1] ?? "";
      byScore[score - 1] = scoreHashes + hash;
      return byScore;
    },
    []
  );

  console.log(JSON.stringify(byScore));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
