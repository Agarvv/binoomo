import { loadEnvFile } from "node:process"
loadEnvFile();

export const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  server: {
    port: process.env.PORT || 3000
  }
};