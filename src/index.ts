import express from 'express';
import router from "./controllers";

const app = express();
const PORT = process.env.PORT || 8999;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log("App listening on port: ", PORT);
})