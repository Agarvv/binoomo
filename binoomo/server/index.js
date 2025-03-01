import express from 'express';

const app = express();

app.get("/health", (req, res) => {
    res.send("Binoomo API Working Fine!"); 
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Binoomo API Started.");
})