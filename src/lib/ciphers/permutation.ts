const process = (text: string, key: string, isEncrypt: boolean): string => {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
  const keyMap = key.split(",").map((k) => parseInt(k.trim(), 10) - 1);
  const blockSize = keyMap.length;

  if (
    keyMap.some(isNaN) ||
    new Set(keyMap).size !== blockSize ||
    Math.min(...keyMap) !== 0 ||
    Math.max(...keyMap) !== blockSize - 1
  ) {
    return "Invalid key. Must be a permutation from 1 to block size, e.g., '3,1,4,2'";
  }

  let result = "";
  for (let i = 0; i < cleanText.length; i += blockSize) {
    const block = cleanText.substring(i, i + blockSize).padEnd(blockSize, "X");
    const newBlock = new Array(blockSize);
    for (let j = 0; j < blockSize; j++) {
      if (isEncrypt) {
        newBlock[keyMap[j]] = block[j];
      } else {
        newBlock[j] = block[keyMap[j]];
      }
    }
    result += newBlock.join("");
  }
  return result;
};

export function encrypt(text: string, key: string): string {
  return process(text, key, true);
}

export function decrypt(cipher: string, key: string): string {
  return process(cipher, key, false);
}
