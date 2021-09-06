export function randomBagId(max = 8000) {
  return String(Math.floor(Math.random() * max) + 1);
}
