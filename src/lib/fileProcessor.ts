// Menggunakan Vigenere untuk file biner
function vigenereByte(byte: number, keyByte: number, encrypt: boolean): number {
  if (encrypt) {
    return (byte + keyByte) % 256;
  } else {
    return (byte - keyByte + 256) % 256;
  }
}

function processFile(
  data: Uint8Array,
  key: string,
  encrypt: boolean
): Uint8Array {
  const keyBytes = new TextEncoder().encode(key);
  if (keyBytes.length === 0) return data; // Return original if key is empty

  const result = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const keyByte = keyBytes[i % keyBytes.length];
    result[i] = vigenereByte(data[i], keyByte, encrypt);
  }
  return result;
}

export async function encryptFile(file: File, key: string): Promise<Blob> {
  const originalBuffer = await file.arrayBuffer();
  const originalData = new Uint8Array(originalBuffer);

  const encryptedData = processFile(originalData, key, true);

  // Tambahkan metadata: nama file asli
  const fileNameBytes = new TextEncoder().encode(file.name);
  const fileNameLength = new Uint8Array([fileNameBytes.length]);

  const finalBlob = new Blob([fileNameLength, fileNameBytes, encryptedData]);
  return finalBlob;
}

export async function decryptFile(
  file: File,
  key: string
): Promise<{ blob: Blob; fileName: string }> {
  const fileBuffer = await file.arrayBuffer();
  const fileData = new Uint8Array(fileBuffer);

  // Ekstrak metadata
  const fileNameLength = fileData[0];
  const fileNameBytes = fileData.slice(1, 1 + fileNameLength);
  const fileName = new TextDecoder().decode(fileNameBytes);

  const encryptedData = fileData.slice(1 + fileNameLength);
  const decryptedData = processFile(encryptedData, key, false);

  return {
    blob: new Blob([decryptedData]),
    fileName: fileName,
  };
}
