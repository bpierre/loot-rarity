import type { Rarity } from "./types";

import { itemRarity } from "./index";
import rarityLevels from "./rarity-levels";

export function svgFromItems(
  items: string[],
  {
    levels,
    displayLevels = false,
  }: {
    displayLevels?: boolean;
    levels?: Rarity[];
  } = {}
) {
  if (items.length !== 8) {
    throw new Error("A bag should contain exactly 8 items");
  }
  const levelStyles = levels
    ? rarityLevels
        .map(([_, color], index) => {
          return !levels.includes((index + 1) as Rarity)
            ? ""
            : `.level-${index + 1} { fill: ${color}; }`;
        })
        .join("")
    : "";
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" ' +
    'preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">' +
    "<style>" +
    "text { fill: white; font-family: serif; font-size: 14px; }" +
    levelStyles +
    "</style>" +
    '<rect width="100%" height="100%" fill="black" />' +
    items
      .map((item, index) => {
        const y = 20 * (index + 1);
        const levelClass = levels ? ` level-${levels[index]}` : "";
        const levelLabel =
          levels && displayLevels
            ? ` (${rarityLevels[levels[index] - 1][2].slice(0, 1)})`
            : "";
        return `<text x="10" y="${y}" class="base${levelClass}">${
          item + levelLabel
        }</text>`;
      })
      .join("") +
    "</svg>"
  );
}

export function svgDataUri(svg: string): string {
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

const MATCH_TEXT_RE = /<text[^>]+\>([^<]+)<\/text>/;

export function itemsFromSvg(svg: string) {
  if (!svg.startsWith("<svg")) {
    throw new Error("The svg paramater doesn’t seem to be an SVG");
  }

  let matches: null | string[];
  const items = [];
  for (let i = 0; i < 8; i++) {
    matches = svg.match(MATCH_TEXT_RE);
    if (!matches) {
      throw new Error(
        "Error when parsing the SVG: couldn’t find the next item"
      );
    }
    items.push(matches[1]);
    svg = svg.slice(svg.indexOf(matches[0]) + matches[0].length);
  }
  return items;
}

export function isUri(data: string) {
  return /^(?:https?|data)\:/.test(data);
}

export async function imageRarity(
  svgOrSvgUri: string,
  { displayLevels = false }: { displayLevels?: boolean } = {}
): Promise<string> {
  const svg = isUri(svgOrSvgUri)
    ? await fetch(svgOrSvgUri).then((res) => res.text())
    : svgOrSvgUri;

  if (!svg.startsWith("<svg")) {
    throw new Error(
      "The image doesn’t seem to be an SVG or a URL pointing to an SVG"
    );
  }
  const items = itemsFromSvg(svg);
  const colorSvg = svgFromItems(items, {
    displayLevels,
    levels: items.map(itemRarity),
  });
  return svgDataUri(colorSvg);
}
