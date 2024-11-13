import express, { Request, Response } from "express";
import booksRouter from "./routes/books"

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/books", booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});