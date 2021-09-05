export type Guild = {
  emoji: string;
  special: string;
  color: string;
  match: (name: string) => boolean;
};

const lc = (item: string = "") => item.toLowerCase();

export default [
  {
    emoji: "🦊",
    special: "of the fox",
    color: "orangered",
    match: (name) => lc(name).includes("of the fox"),
  },
  {
    emoji: "👗",
    special: "divine robes",
    color: "cyan",
    match: (name) => lc(name).includes("divine robe"),
  },
  {
    emoji: "✨",
    special: "divine items",
    color: "royalblue",
    match: (name) => lc(name).includes("divine"),
  },
  {
    emoji: "🐲",
    special: "dragons",
    color: "greenyellow",
    match: (name) => lc(name).includes("dragon"),
  },
  {
    emoji: "🪖",
    special: "ancient helms",
    color: "saddlebrown",
    match: (name) => lc(name).includes("ancient helm"),
  },
  {
    emoji: "🗡",
    special: "katanas",
    color: "crimson",
    match: (name) => lc(name).includes("katana"),
  },
  {
    emoji: "👑",
    special: "crowns",
    color: "yellow",
    match: (name) => lc(name).includes("crown"),
  },
] as Guild[];
