import { config } from './config/config.js';
import express from 'express';

console.log("🔍 ENV Variables in index.js:");
console.log("DB_HOST:", process.env.DB_HOST ? "localhost" : "NOT SET");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "NOT SET");
console.log("DB_NAME:", process.env.DB_NAME);

import { testDatabase } from './config/database.js';


const app = express();

app.get("/health", (req, res) => {
    res.send("Binoomo API Working Fine!"); 
})

app.listen(config.server.port, async () => {
    await testDatabase()
    console.log("SERVER STARTED SUCCESSFULLY, ALL SYSTEMS OK")
})