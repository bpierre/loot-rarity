import fetch from "cross-fetch";

export function isUri(data: string) {
  return /^(?:https?|data)\:/.test(data);
}

export function dataUri(mediaType: string, data: string): string {
  return `data:${mediaType},${encodeURIComponent(data)}`;
}

export async function fetchOrDecodeDataUri(dataOrUrl: string): Promise<string> {
  if (dataOrUrl.startsWith("http") || typeof Buffer === "undefined") {
    return fetch(dataOrUrl).then((res) => res.text());
  }

  if (!dataOrUrl.startsWith("data:")) {
    throw new Error("Protocol not supported: " + dataOrUrl);
  }

  // Probably a node environment. Since cross-fetch doesn’t support data: URLs
  // yet in node environments, we have to do this manually. Note: node-fetch
  // 3.0 has been released and supports data: URLs, but cross-fetch hasn’t
  // updated this dependency yet.
  const separator = dataOrUrl.indexOf(",");
  const [prefix, data] = [
    dataOrUrl.slice(0, separator),
    dataOrUrl.slice(separator + 1),
  ];
  const isBase64 = prefix.includes(";base64");

  return isBase64
    ? Buffer.from(data, "base64").toString()
    : decodeURIComponent(data);
}

let _warned = new Map();
export function warnDeprecatedName(oldName: string, newName: string): void {
  if (!_warned.get(oldName)) {
    console.warn(
      `${oldName} is deprecated and will be removed in a future version, please use ${newName} instead.`
    );
    _warned.set(oldName, true);
  }
}
