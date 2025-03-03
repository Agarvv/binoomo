import express from 'express';
import dotenv from 'dotenv';
import { testDatabase } from './config/database.js';


dotenv.config();

const app = express();

app.get("/health", (req, res) => {
    res.send("Binoomo API Working Fine!"); 
})

app.listen(process.env.PORT || 3000, async () => {
    await testDatabase()
    console.log("SERVER STARTED SUCCESSFULLY, ALL SYSTEMS OK")
})