import { Router, Request, Response } from "express";

const router  = Router();

const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
 ];

 router.get("/", (req: Request, res: Response) => {
    res.json(books);
 });

 export default router;
