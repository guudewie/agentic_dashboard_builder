import "dotenv/config";
import { Pool } from "pg";

export const db: Pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
