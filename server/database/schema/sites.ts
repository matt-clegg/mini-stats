import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const sites = sqliteTable("sites", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  domain: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
