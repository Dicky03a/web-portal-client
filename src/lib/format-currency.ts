/**
 * Rupiah formatting helpers.
 *
 * Money is stored as BIGINT rupiah (integer, no decimals) per
 * implementation-standards.md §4. Never use floating point for money.
 */

/** Format an integer rupiah amount as `"Rp1.234.567"` (id-ID grouping). */
export function formatRupiah(amount: bigint): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

/**
 * Parse a rupiah string back to BIGINT. Strips a leading `Rp`, whitespace,
 * and `.` thousands separators. Throws on any non-digit remainder.
 */
export function parseRupiah(str: string): bigint {
  const cleaned = str.replace(/rp/i, '').replace(/[.\s]/g, '').trim();
  if (!/^-?\d+$/.test(cleaned)) {
    throw new Error(`Invalid rupiah string: ${str}`);
  }
  return BigInt(cleaned);
}
