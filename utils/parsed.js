import * as multibase from "multibase";

/**
 * Converts an hex string to Uint8Array
 */
 export const toUint8Array = (hex) => {
  const pairs = hex.match(/[\dA-F]{2}/gi);
  if (!pairs) throw new Error("Invalid hex");
  return new Uint8Array(
    pairs.map((s) => parseInt(s, 16)) // convert to integers
  );
}

/**
 * Converts Uint8Array to hex string
 */
export const toHexString = (buffer) => {
  return Array.from(buffer)
    .map((n) => `0${Number(n).toString(16)}`.slice(-2))
    .join("");
}

/**
 * Encodes an Uint8Array in base58
 */
export const encodeBase58 = (buffer) => {
  return new TextDecoder().decode(multibase.encode("z", buffer)).slice(1);
}

/**
 * Decodes a buffer formatted in base58
 */
export const decodeBase58 = (bs58) => {
  return multibase.decode(`z${bs58}`);
}

/**
 * Encodes an Uint8Array in base64
 */
export const encodeBase64 = (buffer) => {
  return new TextDecoder().decode(multibase.encode("U", buffer)).slice(1);
}

/**
 * Decodes a buffer formatted in base64
 */
export const decodeBase64 = (bs64) => {
  return multibase.decode(`U${bs64}`);
}
