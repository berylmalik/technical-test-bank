const { getAllMembers } = require("../../../domain/member/memberRepository");
const { borrowing, returning } = require("../controllers/memberControllers");
const router = require("express").Router();

router
    .post("/borrow-book", borrowing)
    .post("/return-book", returning)
    .get("/all-member", getAllMembers);

module.exports = router;
