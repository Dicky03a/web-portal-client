/**
 * Portal access token generation and hashing.
 *
 * A raw 128-bit token is embedded in the portal link sent to the client;
 * only its SHA-256 hash is stored (`portal_links.token_hash`), so the
 * database never holds a usable token.
 */
import { createHash, randomBytes } from 'node:crypto';

/** Generate a 128-bit (16-byte) cryptographically-random token as hex. */
export function generateToken(): string {
  return randomBytes(16).toString('hex');
}

/** Hash a token with SHA-256 for storage/lookup (64 lowercase hex chars). */
export function hashToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}
