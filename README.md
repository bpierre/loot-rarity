<img width="100%" alt="loot-rarity" src="https://user-images.githubusercontent.com/36158/131253006-85fb23c9-846f-4d00-b909-f63f181288d3.png">

Get the rarity level of a [Loot](https://lootproject.com) item.

## How does it work?

- Items with 300 or more occurences have a rarity of 1 (common).
- Items between 50 and 300 occurences have a rarity of 2 (uncommon).
- Items between 25 and 50 occurences have a rarity of 3 (rare).
- Items between 10 and 25 occurences have a rarity of 4 (epic).
- Items between 2 and 10 occurences have a rarity of 5 (legendary).
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
function itemRarity(itemName: string): Promise<Rarity>;

// Get the color of an item given its name or rarity.
function rarityColor(itemOrRarity: string | Rarity): Promise<string>;

// Get the description of a rarity given an item name or rarity level.
function rarityDescription(itemOrRarity: string | Rarity): Promise<string>;
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

- [@scotato](https://github.com/scotato) loot-rarity was heavily inspired by [github.com/scotato/inventory](https://github.com/scotato/inventory)
- [@Anish-Agnihotri](https://github.com/Anish-Agnihotri) for [the data he extracted from Loot](https://github.com/Anish-Agnihotri/dhof-loot) and that loot-rarity is using.

## License

MIT
