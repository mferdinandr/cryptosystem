// src/lib/ciphers/hill.ts
function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
}

function determinant(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function inverseMatrix(m: number[][]): number[][] | null {
  const det = determinant(m);
  const detInv = modInverse(det, 26);
  if (detInv === -1) return null;

  const adj = [
    [m[1][1], -m[0][1]],
    [-m[1][0], m[0][0]],
  ];

  return adj.map((row) => row.map((val) => (((val * detInv) % 26) + 26) % 26));
}

function process(text: string, matrix: number[][]): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
  const nums = cleanText.split("").map((c) => c.charCodeAt(0) - 65);
  if (nums.length % 2 !== 0) nums.push(23); // Pad with 'X'

  let result = "";
  for (let i = 0; i < nums.length; i += 2) {
    const v1 = nums[i];
    const v2 = nums[i + 1];
    const r1 = (matrix[0][0] * v1 + matrix[0][1] * v2) % 26;
    const r2 = (matrix[1][0] * v1 + matrix[1][1] * v2) % 26;
    result += String.fromCharCode(r1 + 65) + String.fromCharCode(r2 + 65);
  }
  return result;
}

export function encrypt(text: string, key: string): string {
  const keyNums = key.split(",").map(Number);
  if (keyNums.length !== 4 || keyNums.some(isNaN))
    return "Invalid key. Use 4 comma-separated numbers.";

  const matrix = [
    [keyNums[0], keyNums[1]],
    [keyNums[2], keyNums[3]],
  ];
  if (modInverse(determinant(matrix), 26) === -1)
    return "Invalid key matrix. Determinant is not invertible mod 26.";

  return process(text, matrix);
}

export function decrypt(cipher: string, key: string): string {
  const keyNums = key.split(",").map(Number);
  if (keyNums.length !== 4 || keyNums.some(isNaN))
    return "Invalid key. Use 4 comma-separated numbers.";

  const matrix = [
    [keyNums[0], keyNums[1]],
    [keyNums[2], keyNums[3]],
  ];
  const inv = inverseMatrix(matrix);
  if (!inv) return "Invalid key matrix. Could not compute inverse.";

  return process(cipher, inv);
}
