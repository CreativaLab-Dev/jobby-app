import { format } from "date-fns";

/**
 * Format a given date into a consistent string representation.
 *
 * @param date - The date to format (Date object or string)
 * @param pattern - Optional pattern, default is 'yyyy-MM-dd'
 * @returns Formatted date string
 *
 * Example:
 * formatDate('2025-10-13') => '2025-10-13'
 * formatDate('2025-10-13', 'dd/MM/yyyy') => '13/10/2025'
 */
export function formatDate(date: Date | string, pattern = "yyyy-MM-dd"): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return format(d, pattern);
  } catch (error) {
    console.error("Invalid date passed to formatDate:", date);
    return "";
  }
}
