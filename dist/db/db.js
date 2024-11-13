"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database("library.db", (err) => {
    if (err) {
        console.error("Error opening the db: ", err.message);
    }
    else {
        console.log("Connected to the db!");
        db.run(`
         CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            published_year INTEGER,
            pages INTEGER
         )
      `, (err) => {
            if (err) {
                console.error("Error creating table", err.message);
            }
        });
    }
});
exports.default = db;
