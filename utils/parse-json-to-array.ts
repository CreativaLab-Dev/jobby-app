import { Prisma } from "@prisma/client";

export function parseJsonArray<T = any>(json: Prisma.JsonValue | null | undefined): T[] {
  if (Array.isArray(json)) {
    return json as T[];
  }
  return [];
}
