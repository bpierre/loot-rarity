import type { ColorFn } from "./types";

import { rarityColor, rarityDescription } from "./main";
import { dataUri, fetchOrDecodeDataUri, isUri } from "./utils";

type Options = {
  colorFn?: ColorFn;
  displayLevels?: boolean;
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
      throw new Error(
        "Error when parsing the SVG: couldn’t find the next item"
      );
    }
    items.push(matches[1]);
    svg = svg.slice(svg.indexOf(matches[0]) + matches[0].length);
  }
  return items;
}

export function rarityImageFromItems(
  items: string[],
  { colorFn, imageFormat = "data-uri", displayLevels = false }: Options = {}
) {
  if (items.length !== 8) {
    throw new Error("A bag should contain exactly 8 items");
  }

  const svg = [
    SVG_START,
    ...items.map((item, index) => {
      const y = 20 * (index + 1);
      const level = displayLevels
        ? ` (${rarityDescription(item).slice(0, 1)})`
        : "";
      const color = rarityColor(item, { colorFn });
      return (
        `<text x="10" y="${y}" fill="${color}">` + item + level + `</text>`
      );
    }),
    SVG_END,
  ].join("");

  return imageFormat === "data-uri" ? dataUri("image/svg+xml", svg) : svg;
}

export async function rarityImage(
  svgOrSvgUriOrItems: string | string[],
  options?: Options
): Promise<string> {
  if (Array.isArray(svgOrSvgUriOrItems)) {
    return rarityImageFromItems(svgOrSvgUriOrItems);
  }

  const svg = isUri(svgOrSvgUriOrItems)
    ? await fetchOrDecodeDataUri(svgOrSvgUriOrItems)
    : svgOrSvgUriOrItems;

  if (!svg.startsWith("<svg")) {
    throw new Error(
      "The resource doesn’t seem to be an SVG or a URL pointing to an SVG"
    );
  }

  const items = itemsFromSvg(svg);
  return rarityImageFromItems(items, options);
}
