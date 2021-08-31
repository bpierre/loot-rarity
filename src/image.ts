import type { ColorFn, RarityLevel } from "./types";

import { itemRarity } from "./index";
import rarityLevels from "./rarity-levels";
import { warnDeprecatedName } from "./utils";

function levelsSvgStyles(levels: RarityLevel[], colorFn?: ColorFn) {
  return rarityLevels
    .map(([_, color], index) => {
      const level = (index + 1) as RarityLevel;
      return levels.includes(level)
        ? `.level-${level} { fill: ${colorFn?.({ color, level }) ?? color}; }`
        : "";
    })
    .join("");
}

export function svgFromItems(
  items: string[],
  {
    colorFn,
    levels,
    displayLevels = false,
  }: {
    colorFn?: ColorFn;
    displayLevels?: boolean;
    levels?: RarityLevel[];
  } = {}
) {
  if (items.length !== 8) {
    throw new Error("A bag should contain exactly 8 items");
  }
  const levelStyles = levels ? levelsSvgStyles(levels, colorFn) : "";
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

export function rarityImageFromItems(
  items: string[],
  {
    colorFn,
    displayLevels = false,
  }: { colorFn?: ColorFn; displayLevels?: boolean } = {}
): string {
  return svgDataUri(
    svgFromItems(items, {
      colorFn,
      displayLevels,
      levels: items.map(itemRarity),
    })
  );
}

export async function rarityImage(
  svgOrSvgUriOrItems: string | string[],
  {
    colorFn,
    displayLevels = false,
  }: { colorFn?: ColorFn; displayLevels?: boolean } = {}
): Promise<string> {
  if (Array.isArray(svgOrSvgUriOrItems)) {
    return rarityImageFromItems(svgOrSvgUriOrItems);
  }

  const svg = isUri(svgOrSvgUriOrItems)
    ? await fetch(svgOrSvgUriOrItems).then((res) => res.text())
    : svgOrSvgUriOrItems;

  if (!svg.startsWith("<svg")) {
    throw new Error(
      "The resource doesn’t seem to be an SVG or a URL pointing to an SVG"
    );
  }

  return rarityImageFromItems(itemsFromSvg(svg), { colorFn, displayLevels });
}

// deprecated

export function imageRarityFromItems(
  ...params: Parameters<typeof rarityImageFromItems>
): ReturnType<typeof rarityImageFromItems> {
  warnDeprecatedName("imageRarityFromItems()", "rarityImageFromItems()");
  return rarityImageFromItems(...params);
}

export function imageRarity(
  ...params: Parameters<typeof rarityImage>
): ReturnType<typeof rarityImage> {
  warnDeprecatedName("imageRarity()", "rarityImage()");
  return rarityImage(...params);
}
