// src/lib/ciphers/vigenere.ts
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const process = (text: string, key: string, isEncrypt: boolean): string => {
  const formattedKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (formattedKey.length === 0) return "Invalid key.";

  let result = "";
  let keyIndex = 0;
  for (const char of text.toUpperCase()) {
    if (ALPHABET.includes(char)) {
      const textIndex = ALPHABET.indexOf(char);
      const keyChar = formattedKey[keyIndex % formattedKey.length];
      const keyVal = ALPHABET.indexOf(keyChar);

      const newIndex = isEncrypt
        ? (textIndex + keyVal) % 26
        : (textIndex - keyVal + 26) % 26;

      result += ALPHABET[newIndex];
      keyIndex++;
    }
    // Karakter non-alfabet akan diabaikan dan dibuang dari hasil
  }
  return result;
};

export function encrypt(text: string, key: string): string {
  return process(text, key, true);
}

export function decrypt(cipher: string, key: string): string {
  return process(cipher, key, false);
}
