const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encrypt(text: string, key: string): string {
  const shift = parseInt(key, 10);
  if (isNaN(shift)) return "Invalid key. Must be a number.";

  let result = "";
  for (const char of text.toUpperCase()) {
    if (ALPHABET.includes(char)) {
      const index = ALPHABET.indexOf(char);
      result += ALPHABET[(index + shift) % 26];
    }
  }
  return result;
}

export function decrypt(cipher: string, key: string): string {
  const shift = parseInt(key, 10);
  if (isNaN(shift)) return "Invalid key. Must be a number.";

  let result = "";
  for (const char of cipher.toUpperCase()) {
    if (ALPHABET.includes(char)) {
      const index = ALPHABET.indexOf(char);
      result += ALPHABET[(index - shift + 26) % 26];
    }
  }
  return result;
}
