<img width="1280" alt="Loot Rarity" src="https://user-images.githubusercontent.com/36158/131253911-12092434-7325-4d7b-b1f2-5a752937bdfc.png">

Get the rarity level of a [Loot](https://lootproject.com) item.

## How does it work?

- Items with 374 or more occurences have a rarity of 1 (common).
- Items between 357 and 374 occurences have a rarity of 2 (uncommon).
- Items between 100 and 357 occurences have a rarity of 3 (rare).
- Items between 9 and 100 occurences have a rarity of 4 (epic).
- Items between 2 and 9 occurences have a rarity of 5 (legendary).
- Items with a single occurence have a rarity of 6 (mythic).

## Installation

```sh
npm i --save loot-rarity # npm
yarn add loot-rarity # yarn
pnpm add loot-rarity # pnpm
```

## API

```tsx
// Rarity goes from 1 to 6.
type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

// Get the rarity of an item given its name.
function itemRarity(itemName: string): Rarity;

// Get the color of an item given its name or rarity.
function rarityColor(itemOrRarity: string | Rarity): string;

// Get the description of a rarity given an item name or rarity level.
function rarityDescription(itemOrRarity: string | Rarity): string;
```

## Demo

Have a look at [the demo app](https://ky7e7.csb.app/) on CodeSandbox to see how it works.

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
