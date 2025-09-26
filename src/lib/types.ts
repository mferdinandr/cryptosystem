export const CipherType = {
  Shift: "shift",
  Substitution: "substitution",
  Affine: "affine",
  Vigenere: "vigenere",
  Hill: "hill",
  Permutation: "permutation",
  OneTimePad: "oneTimePad",
} as const;

export type CipherType = (typeof CipherType)[keyof typeof CipherType];

export const CIPHER_NAMES: Record<CipherType, string> = {
  shift: "Shift Cipher",
  substitution: "Substitution Cipher",
  affine: "Affine Cipher",
  vigenere: "Vigenere Cipher",
  hill: "Hill Cipher",
  permutation: "Permutation Cipher",
  oneTimePad: "One-Time Pad",
};
