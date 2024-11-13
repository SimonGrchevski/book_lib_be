import sqlite3  from "sqlite3";

const db = new sqlite3.Database("library.db", (err) => {
    if(err){
        console.error("Error opening the db: ", err.message);
    }else{
        console.log("Connected to the db!");
        db.run(`
         CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            published_year INTEGER,
            pages INTEGER
         )
      `,
            (err) => {
                if(err) {
                    console.error("Error creating table", err.message);
                }
            })
    }
});

export default db;