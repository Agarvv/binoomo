import { config } from './config/config.js';
import express from 'express';


import { testDatabase } from './config/database.js';


const app = express();

app.get("/health", (req, res) => {
    res.send("Binoomo API Working Fine!"); 
})

app.listen(config.server.port, async () => {
    await testDatabase()
    console.log("SERVER STARTED SUCCESSFULLY, ALL SYSTEMS OK")
})