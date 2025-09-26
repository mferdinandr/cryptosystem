const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const process = (
  text: string,
  keyStream: string,
  isEncrypt: boolean
): string => {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
  const cleanKey = keyStream.toUpperCase().replace(/[^A-Z]/g, "");

  if (cleanKey.length < cleanText.length) {
    return `Error: Kunci dari file terlalu pendek. Pesan membutuhkan ${cleanText.length} huruf, tetapi file kunci hanya berisi ${cleanKey.length} huruf.`;
  }

  let result = "";
  for (let i = 0; i < cleanText.length; i++) {
    const textIndex = ALPHABET.indexOf(cleanText[i]);
    const keyIndex = ALPHABET.indexOf(cleanKey[i]);

    const newIndex = isEncrypt
      ? (textIndex + keyIndex) % 26
      : (textIndex - keyIndex + 26) % 26;

    result += ALPHABET[newIndex];
  }
  return result;
};

export function encrypt(text: string, keyStream: string): string {
  return process(text, keyStream, true);
}

export function decrypt(cipher: string, keyStream: string): string {
  return process(cipher, keyStream, false);
}
