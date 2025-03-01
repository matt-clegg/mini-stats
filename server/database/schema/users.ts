import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { sites } from "./sites";

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  login: text().notNull(),
  name: text().notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const userRelations = relations(users, ({ many }) => ({
  sites: many(sites)
}));

export default users;
