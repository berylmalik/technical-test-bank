const { Book, Member, BorrowHistory } = require("../../infrastructure/database/models");
const { SuccessResponse, ErrorResponse } = require("../../infrastructure/api/utils/response.js");
const Sequelize = require("sequelize");

async function getAllBooks(req, res, next) {
    try {
        const books = await Book.findAll({
            attributes: ["code", "title", "author", "stock"],
        });
        return res.status(200).json(new SuccessResponse("successfully get all data books.", books));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAllAvailableBooks(req, res, next) {
    try {
        const books = await Book.findAll({
            where: {
                stock: {
                    [Sequelize.Op.gt]: 0,
                },
            },
            attributes: ["code", "title", "author", "stock"],
        });
        return res
            .status(200)
            .json(new SuccessResponse("successfully get all available books.", books));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { getAllBooks, getAllAvailableBooks };
