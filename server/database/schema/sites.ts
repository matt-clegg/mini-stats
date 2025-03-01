import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const sites = sqliteTable("sites", {
  id: text("id").primaryKey().$defaultFn(() => useHash()),
  user: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  domain: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const siteRelations = relations(sites, ({ one }) => ({
  user: one(users, {
    fields: [sites.user],
    references: [users.id]
  })
}));

export default sites;
