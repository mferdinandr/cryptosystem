// src/lib/ciphers/substitution.ts
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encrypt(text: string, key: string): string {
  if (key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
    return "Invalid key. Must be a 26-character permutation of the alphabet.";
  }
  const keyUpper = key.toUpperCase();
  const map = Object.fromEntries(
    ALPHABET.split("").map((c, i) => [c, keyUpper[i]])
  );

  return text
    .toUpperCase()
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

export function decrypt(cipher: string, key: string): string {
  if (key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
    return "Invalid key. Must be a 26-character permutation of the alphabet.";
  }
  const keyUpper = key.toUpperCase();
  const inverseMap = Object.fromEntries(
    keyUpper.split("").map((c, i) => [c, ALPHABET[i]])
  );

  return cipher
    .toUpperCase()
    .split("")
    .map((char) => inverseMap[char] || char)
    .join("");
}
