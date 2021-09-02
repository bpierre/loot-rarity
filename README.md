<img width="1280" alt="Loot Rarity" src="https://user-images.githubusercontent.com/36158/131556816-cf5861c7-8619-4b56-9d90-f538ebb86f74.png">

Rarity levels for [Loot](https://lootproject.com).

## How are the rarity levels determined?

The rarity level of any given item is deducted from its number of occurrences in the total number of Loot items.

| Rarity level                                                                                                                             | Description                                        | Occurrences           |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------- |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379065-5eef7b05-458c-4717-bfa8-c2d086283f0b.png"> Level 1 | **Common** items appear **375** or more times.     | 47.25% - 30,237 items |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379064-442c9a9e-90c9-4cb9-8fac-1ed0dbed5609.png"> Level 2 | **Uncommon** items appear less than **375** times. | 12.61% - 8,073 items  |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379063-1b6fa149-945f-467a-893e-e90eab48c20c.png"> Level 3 | **Rare** items appear less than **358** times.     | 11.78% - 7,537 items  |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379062-4847e475-8250-4e17-bec1-71c586b4e419.png"> Level 4 | **Epic** items appear less than **101** times.     | 10.29% - 6,587 items  |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379061-acead0af-797b-47f9-9d71-db8c7d6b1696.png"> Level 5 | **Legendary** items appear less than **10** times. | 9.67% - 6,189 items   |
| <img width="10" alt="" src="https://user-images.githubusercontent.com/36158/131379060-7fa91e93-dbc2-4a55-8d0c-125bc43e16e1.png"> Level 6 | **Mythic** items appear exactly **1** time.        | 8.4% - 5,377 items    |

## Installation

```sh
npm i --save loot-rarity # npm
yarn add loot-rarity # yarn
pnpm add loot-rarity # pnpm
```

## API

### Types

```ts
// RarityLevel goes from 1 (common) to 6 (mythic). See table above for more info.
type RarityLevel = 1 | 2 | 3 | 4 | 5 | 6;

// ColorFn allows to override a color in different places.
type ColorFn = (colorParameters: {
  level: RarityLevel; // the rarity level
  color: string; // the base color you can override
  itemName?: string; // in certain cases the item name will be present
}) => string | void | null; // return a string to override the color
```

### itemRarity()

```ts
function itemRarity(itemName: string): RarityLevel;
```

This function returns the rarity level of an item, given its name.

Example:

```js
let rarity = itemRarity('"Golem Roar" Studded Leather Belt of Fury');

console.log(rarity); // 6
```

### rarityColor()

```ts
function rarityColor(
  itemOrRarityLevel: string | RarityLevel,
  options?: { colorFn: ColorFn }
): string;
```

This function returns the color of a rarity level, given an item name or a rarity level.

Example:

```js
let color = rarityColor("Ornate Belt of Perfection");

console.log(color); // "#c13cff"
```

### rarityDescription()

```ts
function rarityDescription(itemOrRarityLevel: string | RarityLevel): string;
```

This function returns the description of a rarity level, given an item name or a rarity level.

Example:

```js
let levelA = rarityDescription(1);
let levelB = rarityDescription("Studded Leather Boots of Rage");

console.log(levelA); // "Common"
console.log(levelB); // "Legendary"
```

### rarityImage()

```ts
function rarityImage(
  imageOrItems: string | string[],
  options?: {
    colorFn?: ColorFn;
    displayLevels?: Boolean;
    imageFormat: "data-uri" | "svg";
  }
): Promise<string>;
```

This function generates an image with added rarity levels.

It accepts any of the following:

- SVG source of a Loot image.
- An array of Loot items.
- Data URI representing a Loot image.
- Data URI representing a Loot metadata (as returned by the `tokenURI()` method of the Loot contract).
- HTTP URL pointing to a Loot image.

- The `colorFn` option allows to override the color of a particular item.
- The `displayLevels` option allows to add levels to the items list.
- The `imageFormat` option controls the output: data URI (`"data-uri"`) (default) or SVG source (`"svg"`).

Example with React, [use-nft](https://github.com/spectrexyz/use-nft) to load the image, and [swr](https://github.com/vercel/swr) to handle the async function:

```jsx
import { rarityImage } from "loot-rarity";
import { useNft } from "use-nft";
import useSWR from "swr";

function Loot({ tokenId }) {
  const { nft } = useNft(LOOT, id);
  const { data: image } = useSWR(nft?.image, rarityImage);
  return image ? <img src={image} /> : <div>Loading…</div>;
}
```

The resulting images could look like this:

<img width="1000" alt="Illustration of how rarityImage() transforms Loot images." src="https://user-images.githubusercontent.com/36158/131557225-f3a3c22d-c9f9-4f66-ab21-4adb2971c979.png">
<img width="1000" alt="Illustration of how rarityImage() transforms Loot images with the rarity levels added." src="https://user-images.githubusercontent.com/36158/131558000-ea575347-71ff-4200-8857-aa9d79c88536.png">
<img width="1000" alt="Illustration of how rarityImage() transforms Loot images with custom colors." src="https://user-images.githubusercontent.com/36158/131557222-785d5ba6-9535-440d-9e66-0c6a695c979e.png">

### rarityImageFromItems()

```ts
function rarityImageFromItems(
  items: string[],
  options: {
    colorFn?: ColorFn;
    displayLevels?: Boolean;
    imageFormat: "data-uri" | "svg";
  }
): string;
```

This function is similar to rarityImage, except it only accepts an array of items. It is useful when you already have a list of items, because it returns a `string` directly (while `rarityImage()` returns a `Promise` resolving to a `string`).

- The `colorFn` option allows to override the color of a particular item.
- The `displayLevels` option allows to add levels to the items list.
- The `imageFormat` option controls the output: data URI (`"data-uri"`) (default) or SVG source (`"svg"`).

Example:

```js
import { rarityImageFromItems } from "loot-rarity";

const bag = [
  "Grimoire",
  '"Woe Bite" Ornate Chestplate of the Fox +1',
  "Silk Hood",
  "Heavy Belt of Fury",
  "Shoes",
  "Silk Gloves",
  '"Rune Glow" Amulet of Rage',
  "Silver Ring",
];

document.body.innerHTML = `
  <img src=${rarityImageFromItems(bag)} />
`;
```

## Demo

Have a look at [the demo app](https://5e0cs.csb.app/) on CodeSandbox to see how it works.

You can also run it from this repository:

```sh
# Install pnpm if needed
npm i -g pnpm

# Build loot-rarity
pnpm i
pnpm build

# Run the demo app
cd demo
pnpm i
pnpm dev
```

## Thanks

- [@scotato](https://github.com/scotato) for [github.com/scotato/inventory](https://github.com/scotato/inventory), loot-rarity was heavily inspired by it.
- [@Anish-Agnihotri](https://github.com/Anish-Agnihotri) for [the data](https://github.com/Anish-Agnihotri/dhof-loot) he extracted from Loot and that loot-rarity is using.

## License

MIT
