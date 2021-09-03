import { rarityImage } from "../src/image";

const BAG_1_ITEMS = [
  '"Grim Shout" Grave Wand of Skill +1',
  "Hard Leather Armor",
  "Divine Hood",
  "Hard Leather Belt",
  '"Death Root" Ornate Greaves of Skill',
  "Studded Leather Gloves",
  "Necklace of Enlightenment",
  "Gold Ring",
];

const BAG_1_METADATA =
  "data:application/json;base64,eyJuYW1lIjogIkJhZyAjMSIsICJkZXNjcmlwdGlvbiI6ICJMb290IGlzIHJhbmRvbWl6ZWQgYWR2ZW50dXJlciBnZWFyIGdlbmVyYXRlZCBhbmQgc3RvcmVkIG9uIGNoYWluLiBTdGF0cywgaW1hZ2VzLCBhbmQgb3RoZXIgZnVuY3Rpb25hbGl0eSBhcmUgaW50ZW50aW9uYWxseSBvbWl0dGVkIGZvciBvdGhlcnMgdG8gaW50ZXJwcmV0LiBGZWVsIGZyZWUgdG8gdXNlIExvb3QgaW4gYW55IHdheSB5b3Ugd2FudC4iLCAiaW1hZ2UiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhCeVpYTmxjblpsUVhOd1pXTjBVbUYwYVc4OUluaE5hVzVaVFdsdUlHMWxaWFFpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjM1I1YkdVK0xtSmhjMlVnZXlCbWFXeHNPaUIzYUdsMFpUc2dabTl1ZEMxbVlXMXBiSGs2SUhObGNtbG1PeUJtYjI1MExYTnBlbVU2SURFMGNIZzdJSDA4TDNOMGVXeGxQanh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGp4MFpYaDBJSGc5SWpFd0lpQjVQU0l5TUNJZ1kyeGhjM005SW1KaGMyVWlQaUpIY21sdElGTm9iM1YwSWlCSGNtRjJaU0JYWVc1a0lHOW1JRk5yYVd4c0lDc3hQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJME1DSWdZMnhoYzNNOUltSmhjMlVpUGtoaGNtUWdUR1ZoZEdobGNpQkJjbTF2Y2p3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlOakFpSUdOc1lYTnpQU0ppWVhObElqNUVhWFpwYm1VZ1NHOXZaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTSXhNQ0lnZVQwaU9EQWlJR05zWVhOelBTSmlZWE5sSWo1SVlYSmtJRXhsWVhSb1pYSWdRbVZzZER3dmRHVjRkRDQ4ZEdWNGRDQjRQU0l4TUNJZ2VUMGlNVEF3SWlCamJHRnpjejBpWW1GelpTSStJa1JsWVhSb0lGSnZiM1FpSUU5eWJtRjBaU0JIY21WaGRtVnpJRzltSUZOcmFXeHNQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE1qQWlJR05zWVhOelBTSmlZWE5sSWo1VGRIVmtaR1ZrSUV4bFlYUm9aWElnUjJ4dmRtVnpQQzkwWlhoMFBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeE5EQWlJR05zWVhOelBTSmlZWE5sSWo1T1pXTnJiR0ZqWlNCdlppQkZibXhwWjJoMFpXNXRaVzUwUEM5MFpYaDBQangwWlhoMElIZzlJakV3SWlCNVBTSXhOakFpSUdOc1lYTnpQU0ppWVhObElqNUhiMnhrSUZKcGJtYzhMM1JsZUhRK1BDOXpkbWMrIn0=";

const BAG_1_IMAGE_URL =
  "https://storage.opensea.io/files/87e8c5d87f0d8a905bc204ee966ba6e2.svg";

const BAG_1_METADATA_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+";

const BAG_1_IMAGE_TRANSFORMED =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%20meet%22%20viewBox%3D%220%200%20350%20350%22%3E%3Cstyle%3Etext%20%7B%20font-family%3A%20serif%3B%20font-size%3A%2014px%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22black%22%20%2F%3E%3Ctext%20x%3D%2210%22%20y%3D%2220%22%20fill%3D%22%23f8b73e%22%3E%22Grim%20Shout%22%20Grave%20Wand%20of%20Skill%20%2B1%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2240%22%20fill%3D%22%23838383%22%3EHard%20Leather%20Armor%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2260%22%20fill%3D%22%23838383%22%3EDivine%20Hood%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2280%22%20fill%3D%22%232e82ff%22%3EHard%20Leather%20Belt%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22100%22%20fill%3D%22%23ff44b7%22%3E%22Death%20Root%22%20Ornate%20Greaves%20of%20Skill%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22120%22%20fill%3D%22%23838383%22%3EStudded%20Leather%20Gloves%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22140%22%20fill%3D%22%23c13cff%22%3ENecklace%20of%20Enlightenment%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22160%22%20fill%3D%22%23838383%22%3EGold%20Ring%3C%2Ftext%3E%3C%2Fsvg%3E";

const BAG_1_IMAGE_TRANSFORMED_WITH_LEVELS =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%20meet%22%20viewBox%3D%220%200%20350%20350%22%3E%3Cstyle%3Etext%20%7B%20font-family%3A%20serif%3B%20font-size%3A%2014px%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22black%22%20%2F%3E%3Ctext%20x%3D%2210%22%20y%3D%2220%22%20fill%3D%22%23f8b73e%22%3E%22Grim%20Shout%22%20Grave%20Wand%20of%20Skill%20%2B1%20(L)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2240%22%20fill%3D%22%23838383%22%3EHard%20Leather%20Armor%20(C)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2260%22%20fill%3D%22%23838383%22%3EDivine%20Hood%20(C)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2280%22%20fill%3D%22%232e82ff%22%3EHard%20Leather%20Belt%20(R)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22100%22%20fill%3D%22%23ff44b7%22%3E%22Death%20Root%22%20Ornate%20Greaves%20of%20Skill%20(M)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22120%22%20fill%3D%22%23838383%22%3EStudded%20Leather%20Gloves%20(C)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22140%22%20fill%3D%22%23c13cff%22%3ENecklace%20of%20Enlightenment%20(E)%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22160%22%20fill%3D%22%23838383%22%3EGold%20Ring%20(C)%3C%2Ftext%3E%3C%2Fsvg%3E";

const BAG_1_IMAGE_TRANSFORMED_WITH_COLORS =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%20meet%22%20viewBox%3D%220%200%20350%20350%22%3E%3Cstyle%3Etext%20%7B%20font-family%3A%20serif%3B%20font-size%3A%2014px%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22black%22%20%2F%3E%3Ctext%20x%3D%2210%22%20y%3D%2220%22%20fill%3D%22%23f8b73e%22%3E%22Grim%20Shout%22%20Grave%20Wand%20of%20Skill%20%2B1%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2240%22%20fill%3D%22%23838383%22%3EHard%20Leather%20Armor%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2260%22%20fill%3D%22%23838383%22%3EDivine%20Hood%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2280%22%20fill%3D%22%232e82ff%22%3EHard%20Leather%20Belt%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22100%22%20fill%3D%22green%22%3E%22Death%20Root%22%20Ornate%20Greaves%20of%20Skill%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22120%22%20fill%3D%22%23838383%22%3EStudded%20Leather%20Gloves%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22140%22%20fill%3D%22%23c13cff%22%3ENecklace%20of%20Enlightenment%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%22160%22%20fill%3D%22%23838383%22%3EGold%20Ring%3C%2Ftext%3E%3C%2Fsvg%3E";

const BAG_1_IMAGE_TRANSFORMED_AS_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>text { font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" fill="#f8b73e">"Grim Shout" Grave Wand of Skill +1</text><text x="10" y="40" fill="#838383">Hard Leather Armor</text><text x="10" y="60" fill="#838383">Divine Hood</text><text x="10" y="80" fill="#2e82ff">Hard Leather Belt</text><text x="10" y="100" fill="#ff44b7">"Death Root" Ornate Greaves of Skill</text><text x="10" y="120" fill="#838383">Studded Leather Gloves</text><text x="10" y="140" fill="#c13cff">Necklace of Enlightenment</text><text x="10" y="160" fill="#838383">Gold Ring</text></svg>';

const LOOT_LOOSE_METADATA =
  "data:application/json;base64,eyAibmFtZSI6ICJEaXZpbmUgUm9iZSIsICJkZXNjcmlwdGlvbiIgOiAiTG9vdExvb3NlIGxldHMgeW91IHVuYnVuZGxlIHlvdXIgTG9vdCBCYWdzIGludG8gaW5kaXZpZHVhbCBFUkMxMTU1IE5GVHMgb3IgcmVidW5kbGUgaXRlbXMgaW50byB0aGVpciBvcmlnaW5hbCBMb290IEJhZ3MuIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajQ4YzNSNWJHVStMbUpoYzJVZ2V5Qm1hV3hzT2lCM2FHbDBaVHNnWm05dWRDMW1ZVzFwYkhrNklITmxjbWxtT3lCbWIyNTBMWE5wZW1VNklERTBjSGc3SUgwOEwzTjBlV3hsUGp4eVpXTjBJSGRwWkhSb1BTSXhNREFsSWlCb1pXbG5hSFE5SWpFd01DVWlJR1pwYkd3OUltSnNZV05ySWlBdlBqeDBaWGgwSUhnOUlqRXdJaUI1UFNJeU1DSWdZMnhoYzNNOUltSmhjMlVpUGtScGRtbHVaU0JTYjJKbFBDOTBaWGgwUGp4MFpYaDBJSGc5SWpFd0lpQjVQU0kwTUNJZ1kyeGhjM005SW1KaGMyVWlQand2ZEdWNGRENDhMM04yWno0PSIsICJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJTbG90IiwgInZhbHVlIjogIkNoZXN0In0sIHsidHJhaXRfdHlwZSI6ICJJdGVtIiwgInZhbHVlIjogIkRpdmluZSBSb2JlIn1dfQ==";

const LOOT_LOOSE_TRANSFORMED =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%20meet%22%20viewBox%3D%220%200%20350%20350%22%3E%3Cstyle%3Etext%20%7B%20font-family%3A%20serif%3B%20font-size%3A%2014px%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22black%22%20%2F%3E%3Ctext%20x%3D%2210%22%20y%3D%2220%22%20fill%3D%22%23838383%22%3EDivine%20Robe%3C%2Ftext%3E%3C%2Fsvg%3E";

const LOOT_LOOSE_TRANSFORMED_WITH_COLORS =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22xMinYMin%20meet%22%20viewBox%3D%220%200%20350%20350%22%3E%3Cstyle%3Etext%20%7B%20font-family%3A%20serif%3B%20font-size%3A%2014px%3B%20%7D%3C%2Fstyle%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22black%22%20%2F%3E%3Ctext%20x%3D%2210%22%20y%3D%2220%22%20fill%3D%22cyan%22%3EDivine%20Robe%3C%2Ftext%3E%3C%2Fsvg%3E";

describe("rarityImage()", () => {
  test("with a remote URL", async () => {
    const img = await rarityImage(BAG_1_IMAGE_URL);
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED);
  });
  test("with a data URI", async () => {
    const img = await rarityImage(BAG_1_METADATA_IMAGE);
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED);
  });
  test("with an items list", async () => {
    const img = await rarityImage(BAG_1_ITEMS);
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED);
  });
  test("with the encoded metadata", async () => {
    const img = await rarityImage(BAG_1_METADATA);
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED);
  });
  test("with a LootLoose metadata", async () => {
    const img = await rarityImage(LOOT_LOOSE_METADATA);
    expect(img).toBe(LOOT_LOOSE_TRANSFORMED);
  });
  test("with levels displayed", async () => {
    const img = await rarityImage(BAG_1_METADATA_IMAGE, {
      displayLevels: true,
    });
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED_WITH_LEVELS);
  });
  test("with custom colors", async () => {
    const img = await rarityImage(BAG_1_METADATA_IMAGE, {
      colorFn: ({ itemName }) => itemName.includes("Greaves") && "green",
    });
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED_WITH_COLORS);
  });
  test("with LootLoose metadata and custom colors", async () => {
    const img = await rarityImage(LOOT_LOOSE_METADATA, {
      colorFn: ({ itemName }) => itemName.includes("Divine") && "cyan",
    });
    expect(img).toBe(LOOT_LOOSE_TRANSFORMED_WITH_COLORS);
  });
  test("as SVG", async () => {
    const img = await rarityImage(BAG_1_METADATA_IMAGE, {
      imageFormat: "svg",
    });
    expect(img).toBe(BAG_1_IMAGE_TRANSFORMED_AS_SVG);
  });
  test("throws with incorrect data", async () => {
    await expect(rarityImage("incorrect data")).rejects.toThrow();
  });
});
