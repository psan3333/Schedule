import db from "@/db";
import migrations from "@/drizzle/migrations";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";

export async function runMigrations() {
    await migrate(db, migrations);
}