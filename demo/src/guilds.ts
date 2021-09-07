export type Guild = {
  emoji: string;
  special: string;
  match: (name: string) => boolean;
};

const lc = (item: string = "") => item.toLowerCase();

export default [
  {
    emoji: "🦊",
    special: "of the fox",
    match: (name) => lc(name).includes("of the fox"),
  },
  {
    emoji: "🐲",
    special: "dragons",
    match: (name) => lc(name).includes("dragon"),
  },
  {
    emoji: "👗",
    special: "divine robes",
    match: (name) => lc(name).includes("divine robe"),
  },
  {
    emoji: "✨",
    special: "divine items",
    match: (name) => lc(name).includes("divine"),
  },
  {
    emoji: "🪖",
    special: "ancient helms",
    match: (name) => lc(name).includes("ancient helm"),
  },
  {
    emoji: "🗡",
    special: "katanas",
    match: (name) => lc(name).includes("katana"),
  },
  {
    emoji: "📚",
    special: "books",
    match: (name) => /(?:book|tome|grimoire|chronicle)/i.test(name),
  },
  {
    emoji: "👑",
    special: "crowns",
    match: (name) => lc(name).includes("crown"),
  },
] as Guild[];
