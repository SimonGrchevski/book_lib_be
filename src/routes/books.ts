import { Router, Request, Response } from "express";
import db from "../db/db";

const router  = Router();


router.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM books", (err,rows) => {
        if(err) {
            console.error("Error retrieving books:", err.message);
            res.status(500).json({error:"Internal server error"});
        }else {
            res.json(rows);
        }
    });
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    db.get(`SELECT * FROM books where id = ?`, [id], (err,row) => {
        if(err) {
            console.error("Error retrieving book: ", err.message);
            res.status(500).json({error:"Internal server errror"});
        } else {
            res.json(row);
        }
    })
})

router.post("/",(req: Request, res: Response) => {
    const { title, author, published_year, pages } = req.body;
    db.run("INSERT INTO books (title, author, published_year, pages) VALUES (?,?,?,?)", 
        [title,author,published_year,pages],
        function (err){
            if(err) {
                console.error("Error adding book",err.message);
                res.status(500).json({error:"Internal server error"});
            } else {
                res.json({id:this.lastID,title, author, published_year, pages});
            }
        }
    );
});

 export default router;

