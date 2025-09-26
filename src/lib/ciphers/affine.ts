// src/lib/ciphers/affine.ts
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function modInverse(a: number, m: number): number {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return 1;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function encrypt(text: string, key: string): string {
  const parts = key.split(",");
  if (parts.length !== 2) return "Invalid key format. Use a,b";
  const a = parseInt(parts[0], 10);
  const b = parseInt(parts[1], 10);

  if (isNaN(a) || isNaN(b) || gcd(a, 26) !== 1) {
    return "Invalid key. `a` must be coprime with 26.";
  }

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (ALPHABET.includes(char)) {
        const x = ALPHABET.indexOf(char);
        return ALPHABET[(a * x + b) % 26];
      }
      return char;
    })
    .join("");
}

export function decrypt(cipher: string, key: string): string {
  const parts = key.split(",");
  if (parts.length !== 2) return "Invalid key format. Use a,b";
  const a = parseInt(parts[0], 10);
  const b = parseInt(parts[1], 10);

  if (isNaN(a) || isNaN(b) || gcd(a, 26) !== 1) {
    return "Invalid key. `a` must be coprime with 26.";
  }

  const a_inv = modInverse(a, 26);
  return cipher
    .toUpperCase()
    .split("")
    .map((char) => {
      if (ALPHABET.includes(char)) {
        const y = ALPHABET.indexOf(char);
        return ALPHABET[(a_inv * (y - b + 26)) % 26];
      }
      return char;
    })
    .join("");
}
