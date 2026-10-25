/**
 * Result type for expected failures across the service layer.
 *
 * Services return `Result` instead of throwing; repositories throw on
 * unexpected DB errors; actions translate failures into user-facing messages.
 * See architecture-patterns.md §7 and implementation-standards.md §3.
 */
export type Result<T, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** Build a success `Result`. */
export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

/** Build a failure `Result`. */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
