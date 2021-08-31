export type RarityLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type ColorFnParameters = {
  color: string;
  itemName?: string;
  level: RarityLevel;
};

export type ColorFn = (
  params: ColorFnParameters
) => string | void | null | false;

/**
 * @deprecated Please use RarityLevel instead
 */
export type Rarity = RarityLevel;
