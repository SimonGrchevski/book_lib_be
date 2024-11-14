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

router.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, title, published_year, pages } = req.body;

    db.run(
        "UPDATE books SET author = ?, title = ?, published_year = ?, pages = ? WHERE id = ?",
        [author, title, published_year,pages,id],
        function (err) {
            if(err) {
                console.error("Couldn't update book", err.message);
                res.status(500).json({error:"Internal server error"});
            } else if( this.changes == 0){
                res.status(404).json({error:"Book not found!"});
            }
            else {
                res.json({id,title,author,published_year,pages});
            }
        }
    )
})

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    db.run("DELETE FROM books WHERE id = ?", [id], function(err) {
        if(err) {
            console.error("Error deleting book", err.message);
            res.status(500).json({error: "Internal server error"});
        }else if (this.changes === 0) {
            res.status(404).json({error:"Book not found"});
        } else {
            res.json({message:"Book deleted successsfully"});
        }
    });
})

 export default router;

