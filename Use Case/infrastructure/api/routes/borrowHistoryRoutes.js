const {
    getBooksBorrowedByMembers,
} = require("../../../domain/borrowHistory/borrowHistoryRepository");
const router = require("express").Router();

router.get("/borrow-history", getBooksBorrowedByMembers);

module.exports = router;