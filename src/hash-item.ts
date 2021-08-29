/**
 * This file is based on previous work:
 * shorthash2 (c) 2020 Jecsham https://github.com/jecsham/shorthash2 (MIT)
 * shorthash (c) 2013 Bibig https://github.com/bibig/node-shorthash (MIT)
 */

const DICT =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+,./:;<=>?@[]^_`{|}~";
const PAD_CHAR = "¤";
const HASH_LENGTH = 5;

function bitwise(str: string) {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}

function binaryTransfer(integer: number, binary?: number) {
  binary = binary || DICT.length;
  let stack = [];
  let num: number;
  let result = "";
  const sign = integer < 0 ? "-" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    stack.push(DICT[num]);
  }
  if (integer > 0) {
    stack.push(DICT[integer]);
  }
  for (var i = stack.length - 1; i >= 0; i--) {
    result += stack[i];
  }
  return sign + result;
}

function shorthash(text: string) {
  let type = typeof text;
  if (type === "string" || type === "number") {
    const id = binaryTransfer(bitwise(String(text)), DICT.length - 1);
    return id.replace("-", "Z");
  } else {
    throw new Error("Unexpected input type");
  }
}

export function hashItem(name: string): string {
  return shorthash(name).slice(0, HASH_LENGTH).padStart(HASH_LENGTH, PAD_CHAR);
}
