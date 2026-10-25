/**
 * Content hashing for document-version immutability.
 *
 * Document content is serialized to canonical TEXT and a SHA-256 hash is
 * frozen at `sent_at`; client approval compares a submitted hash against the
 * stored one. See implementation-standards.md §7.
 */
import { createHash } from "node:crypto";

/** Compute the SHA-256 hex digest (64 lowercase hex chars) of a UTF-8 string. */
export function computeContentHash(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
