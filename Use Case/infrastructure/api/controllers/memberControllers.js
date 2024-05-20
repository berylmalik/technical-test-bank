// const { returnBook } = require("../../../domain/member/memberUseCase.js");
const { Book, Member, BorrowHistory } = require("../../database/models");
const { SuccessResponse, ErrorResponse } = require("../utils/response.js");

async function borrowing(req, res, next) {
    try {
        const { memberCode, booksCode } = req.body;

        const member = await Member.findOne({
            where: {
                code: memberCode,
            },
        });
        const books = await Book.findAll({
            where: {
                code: booksCode,
            },
        });

        if (!member || !books.length || !books.indexOf(booksCode)) {
            return res.status(404).json(new ErrorResponse(`member or books not found!`));
        }

        let booksArray = [];
        let soldOut = [];
        if (member.borrowedBooks <= 1) {
            for (let i = 0; i < books.length; i++) {
                if (books[i].stock == 1) {
                    let bookCode = books[i].code;
                    booksArray.push(bookCode);
                    member.borrowedDate = new Date();
                    member.borrowedBooks++;
                    books[i].stock--;
                    await BorrowHistory.create({
                        memberCode: member.code,
                        bookCode: bookCode,
                        returned: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                    if (member.borrowedBooks == 2) break;
                } else if (books[i].stock < 1 && books[i].stock > 1) {
                    soldOut.push(books[i].code);
                }
            }

            console.log(booksArray, "<<< booksArray");
            console.log(soldOut, "<<<< soldOut");
            await member.save();
            await Promise.all(books.map((book) => book.save()));
            if (soldOut.length === booksArray.length) {
                return res
                    .status(400)
                    .json(new ErrorResponse(`Your reqeusted book has been borrowed out.`));
            }
            return res
                .status(200)
                .json(
                    new SuccessResponse(
                        `${member.name} successfully borrowed ${member.borrowedBooks} book which is ${booksArray}`
                    )
                );
        }
        return res
            .status(400)
            .json(
                new ErrorResponse(
                    `You already borrowed 2 book, please return your borrowed books first.`
                )
            );
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function returning(req, res, next) {
    try {
        const { memberCode, bookCode, id } = req.body;

        if (!memberCode || !bookCode || !id) {
            return res
                .status(400)
                .json(
                    new ErrorResponse(`Member code, book code, or borrow history id not provided!`)
                );
        }

        const member = await Member.findOne({
            where: { code: memberCode },
        });
        if (!member) {
            return res
                .status(404)
                .json(new ErrorResponse(`Member with code ${memberCode} not found!`));
        }

        const book = await Book.findOne({
            where: { code: bookCode },
        });
        if (!book) {
            return res.status(404).json(new ErrorResponse(`Book with code ${bookCode} not found!`));
        }

        const borrowHistory = await BorrowHistory.findOne({
            where: { id },
        });
        if (!borrowHistory) {
            return res
                .status(404)
                .json(new ErrorResponse(`Borrow history with id ${id} not found!`));
        }

        if (!borrowHistory.returned) {
            borrowHistory.returned = true;
            await borrowHistory.save();

            book.stock++;
            await book.save();

            member.borrowedBooks--;
            await member.save();

            const returnDate = new Date();
            const daysDifference =
                (returnDate - new Date(member.borrowedDate)) / (24 * 60 * 60 * 1000);

            if (daysDifference > 7) {
                member.penalty = true;
                member.penaltyEndDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
                await member.save();
            }
        }

        return res
            .status(200)
            .json(new SuccessResponse(`${member.name} successfully returned the book`, bookCode));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = { returning };

module.exports = { borrowing, returning };
