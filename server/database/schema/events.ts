import { text, integer, sqliteTable, index } from "drizzle-orm/sqlite-core";
import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { sites } from "./sites";

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  site: text("site_id").references((): AnySQLiteColumn => sites.id, { onDelete: "cascade" }).notNull(),
  url: text().notNull(),
  referrer: text(),
  browser: text(),
  device: text(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
}, events => [
  index("idx_events_site").on(events.site),
  index("idx_events_created_at").on(events.createdAt)
]);

export type EventsInsert = typeof events.$inferInsert;
export type EventsSelect = typeof events.$inferSelect;
