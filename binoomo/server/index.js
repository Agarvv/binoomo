import express from 'express';
import dotenv from 'dotenv';
import { testDatabase } from './config/database.js';

dotenv.config();

console.log(`host: ${process.env.DB_HOST},
    port: ${process.env.DB_PORT},
    user: ${process.env.DB_USER}, 
    password: ${process.env.DB_PASSWORD},
    database: ${process.env.DB_NAME}`)

const app = express();

app.get("/health", (req, res) => {
    res.send("Binoomo API Working Fine!"); 
})

app.listen(process.env.PORT || 3000, async () => {
    await testDatabase()
    console.log("SERVER STARTED SUCCESSFULLY, ALL SYSTEMS OK")
})