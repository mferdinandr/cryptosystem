// src/lib/ciphers/shift.ts
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encrypt(text: string, key: string): string {
  const shift = parseInt(key, 10);
  if (isNaN(shift)) return "Invalid key. Must be a number.";

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (ALPHABET.includes(char)) {
        const index = ALPHABET.indexOf(char);
        return ALPHABET[(index + shift) % 26];
      }
      return char; // Mempertahankan spasi dan karakter lain
    })
    .join("");
}

export function decrypt(cipher: string, key: string): string {
  const shift = parseInt(key, 10);
  if (isNaN(shift)) return "Invalid key. Must be a number.";

  return cipher
    .toUpperCase()
    .split("")
    .map((char) => {
      if (ALPHABET.includes(char)) {
        const index = ALPHABET.indexOf(char);
        return ALPHABET[(index - shift + 26) % 26];
      }
      return char;
    })
    .join("");
}
