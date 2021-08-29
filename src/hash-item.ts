export type WebCrypto = {
  subtle: {
    digest(algorithm: string, data: ArrayBuffer): Promise<ArrayBuffer>;
  };
};

let textEncoder: TextEncoder;

export async function hashItem(
  name: string,
  crypto: WebCrypto = globalThis.crypto
) {
  if (!textEncoder) textEncoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest(
    "SHA-1",
    textEncoder.encode(name)
  );
  return hashBufferToStr(hashBuffer);
}

function hashBufferToStr(hashBuffer: ArrayBuffer) {
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // There are no collisions with this particular setup:
  //   - 6 chars
  //   - starting from index 3
  //   - using SHA-1
  return String.fromCodePoint(
    ...[3, 5, 7].map(
      (start) => 0x100 + parseInt(hash.slice(start, start + 2), 16)
    )
  );
}
