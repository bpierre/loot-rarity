import type { ColorFn } from "./types";

import { lootRarity, itemRarity, rarityColor, rarityDescription } from "./main";
import {
  dataUri,
  fetchOrDecodeDataUri,
  isUri,
  warnDeprecatedName,
} from "./utils";
import { rarityBadge } from "./rarity-badge";

type Options = {
  colorFn?: ColorFn;
  displayLevels?: boolean;
  displayItemLevels?: boolean;
  displayLootLevel?: boolean;
  imageFormat?: "data-uri" | "svg";
};

const SVG_START =
  '<svg xmlns="http://www.w3.org/2000/svg" ' +
  'preserveAspectRatio="xMinYMin meet" ' +
  'viewBox="0 0 350 350">' +
  "<style>" +
  "text { font-family: serif; font-size: 14px; }" +
  "</style>" +
  '<rect width="100%" height="100%" fill="black" />';
const SVG_END = "</svg>";

const MATCH_ITEM_TEXT = /<text[^>]+\>([^<]+)<\/text>/;

export function itemsFromSvg(svg: string) {
  if (!svg.startsWith("<svg")) {
    throw new Error("The svg paramater doesn’t seem to be an SVG");
  }

  let matches: null | string[];
  const items = [];
  for (let i = 0; i < 8; i++) {
    matches = svg.match(MATCH_ITEM_TEXT);
    if (!matches) {
      if (items.length === 0) {
        throw new Error(
          "Error when parsing the SVG: couldn’t find the next item"
        );
      }
      // Probably a LootLoose image
      return items;
    }
    items.push(matches[1]);
    svg = svg.slice(svg.indexOf(matches[0]) + matches[0].length);
  }
  return items;
}

export function rarityImageFromItems(
  items: string[],
  {
    colorFn,
    displayLevels,
    displayItemLevels,
    displayLootLevel = false,
    imageFormat = "data-uri",
  }: Options = {}
) {
  if (items.length < 1) {
    throw new Error("A Loot bag should contain at least one item");
  }

  if (displayLevels !== undefined) {
    warnDeprecatedName("displayLevels", "displayItemLevels");
  }
  if (displayItemLevels === undefined) {
    displayItemLevels = displayLevels ?? false;
  }

  const svg = [
    SVG_START,
    ...items.map((item, index) => {
      const y = 20 * (index + 1);
      const level = itemRarity(item);
      const label = displayItemLevels
        ? ` (${rarityDescription(level).slice(0, 1)})`
        : "";
      const color = rarityColor(item, { colorFn });
      return (
        `<text x="10" y="${y}" fill="${color}">` + item + label + `</text>`
      );
    }),
    displayLootLevel ? rarityBadge(lootRarity(items)) : "",
    SVG_END,
  ].join("");

  return imageFormat === "data-uri" ? dataUri("image/svg+xml", svg) : svg;
}

const INPUT_ERROR =
  "The resource doesn’t seem to be a Loot SVG, a Loot metadata, or a URL pointing to it";

export async function rarityImage(
  svgOrSvgUriOrItems: string | string[],
  options?: Options
): Promise<string> {
  if (Array.isArray(svgOrSvgUriOrItems)) {
    return rarityImageFromItems(svgOrSvgUriOrItems);
  }

  let svg = svgOrSvgUriOrItems;

  // Accepts the metadata string as returned by tokenURI()
  if (svg.startsWith("data:application/json")) {
    try {
      svg = JSON.parse(await fetchOrDecodeDataUri(svg)).image;
    } catch (err) {
      throw new Error(INPUT_ERROR);
    }
  }

  // Fetch URLs or parse data URIs
  if (isUri(svg)) {
    svg = await fetchOrDecodeDataUri(svg);
  }

  if (!svg.startsWith("<svg")) {
    throw new Error(INPUT_ERROR);
  }

  const items = itemsFromSvg(svg);
  return rarityImageFromItems(items, options);
}
