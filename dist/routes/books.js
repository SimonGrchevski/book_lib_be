"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
];
router.get("/", (req, res) => {
    res.json(books);
});
exports.default = router;
