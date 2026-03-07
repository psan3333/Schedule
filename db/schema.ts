import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTable = sqliteTable("user_todo", {
    id: integer().primaryKey({ autoIncrement: true }),
    changedAt: integer({ mode: 'timestamp' }).notNull(),
    title: text().notNull(),
    description: text(),
    metricOfCompletion: text(),
});