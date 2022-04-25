import express from 'express';

const app = express();
const PORT = process.env.PORT || 8999;

app.get('/', (req,res) => {
    res.send("Hello world");
})

app.listen(PORT, () => {
    console.log("App listening on port: ", PORT);
})