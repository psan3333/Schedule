import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expoDB = openDatabaseSync(process.env.DB_URL!);
const db = drizzle(expoDB);

export default db;