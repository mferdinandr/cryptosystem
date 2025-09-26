// 1. Buat objek JavaScript biasa dengan 'as const'
// Ini akan menjadi "nilai" kita, sama seperti objek enum.
export const CipherType = {
  Shift: "shift",
  Substitution: "substitution",
  Affine: "affine",
  Vigenere: "vigenere",
  Hill: "hill",
  Permutation: "permutation",
} as const;

// 2. Buat tipe data dari nilai-nilai objek di atas
// Ini akan menjadi "tipe" kita, menghasilkan: "shift" | "substitution" | ...
export type CipherType = (typeof CipherType)[keyof typeof CipherType];

// CIPHER_NAMES tetap sama dan akan berfungsi dengan baik
export const CIPHER_NAMES: Record<CipherType, string> = {
  shift: "Shift Cipher",
  substitution: "Substitution Cipher",
  affine: "Affine Cipher",
  vigenere: "Vigenere Cipher",
  hill: "Hill Cipher",
  permutation: "Permutation Cipher",
};
