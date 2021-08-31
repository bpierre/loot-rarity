export type RarityLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type ColorFn = (colorParameters: {
  color: string;
  itemName?: string;
  level: RarityLevel;
}) => string | void | null;

/**
 * @deprecated Please use RarityLevel instead
 */
export type Rarity = RarityLevel;
