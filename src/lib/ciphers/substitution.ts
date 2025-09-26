const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encrypt(text: string, key: string): string {
  if (key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
    return "Invalid key. Must be a 26-character permutation.";
  }
  const keyUpper = key.toUpperCase();
  const map = Object.fromEntries(
    ALPHABET.split("").map((c, i) => [c, keyUpper[i]])
  );

  let result = "";
  for (const char of text.toUpperCase()) {
    if (ALPHABET.includes(char)) {
      result += map[char];
    }
  }
  return result;
}

export function decrypt(cipher: string, key: string): string {
  if (key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
    return "Invalid key. Must be a 26-character permutation.";
  }
  const keyUpper = key.toUpperCase();
  const inverseMap = Object.fromEntries(
    keyUpper.split("").map((c, i) => [c, ALPHABET[i]])
  );

  let result = "";
  for (const char of cipher.toUpperCase()) {
    if (ALPHABET.includes(char)) {
      result += inverseMap[char];
    }
  }
  return result;
}
