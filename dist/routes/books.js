"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db/db"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    db_1.default.all("SELECT * FROM books", (err, rows) => {
        if (err) {
            console.error("Error retrieving books:", err.message);
            res.status(500).json({ error: "Internal server error" });
        }
        else {
            res.json(rows);
        }
    });
});
router.post("/", (req, res) => {
    const { title, author, published_year, pages } = req.body;
    db_1.default.run("INSERT INTO books (title, author, published_year, pages) VALUES (?,?,?,?)", [title, author, published_year, pages], (err) => {
        if (err) {
            console.error("Error adding book", err.message);
            res.status(500).json({ error: "Internal server error" });
        }
        else {
            res.json({ id: 2, title, author, published_year, pages });
        }
    });
});
exports.default = router;
