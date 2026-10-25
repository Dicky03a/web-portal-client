/**
 * Date/time formatting in WIB (Asia/Jakarta).
 *
 * Timestamps are stored as UTC (TIMESTAMPTZ) and always displayed in WIB.
 * See implementation-standards.md §5.
 */
import { formatInTimeZone } from "date-fns-tz";

const WIB = "Asia/Jakarta";

/** Format a datetime in WIB, e.g. `"25 Oct 2026 14:30"`. */
export function formatWIB(date: Date): string {
  return formatInTimeZone(date, WIB, "dd MMM yyyy HH:mm");
}

/** Format a date-only value in WIB, e.g. `"25 Oct 2026"`. */
export function formatDateWIB(date: Date): string {
  return formatInTimeZone(date, WIB, "dd MMM yyyy");
}
