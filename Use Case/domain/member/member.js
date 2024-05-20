class Member {
    constructor(
        code,
        name,
        penalty = false,
        penaltyEndDate = null,
        borrowedBooks = [],
        borrowedDate
    ) {
        this.code = code;
        this.name = name;
        this.penalty = penalty;
        this.penaltyEndDate = penaltyEndDate;
        this.borrowedBooks = borrowedBooks;
        this.borrowedDate = borrowedDate;
    }
}
module.exports = { Member };
