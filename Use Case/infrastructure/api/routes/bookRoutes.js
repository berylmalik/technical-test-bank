const { getAllBooks, getAllAvailableBooks } = require("../../../domain/book/bookRepository");
const router = require("express").Router();

router.get("/show-all-books", getAllBooks).get("/show-available-books", getAllAvailableBooks);

module.exports = router;
