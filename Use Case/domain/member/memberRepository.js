const { Book, Member, BorrowHistory } = require("../../infrastructure/database/models");
const { SuccessResponse, ErrorResponse } = require("../../infrastructure/api/utils/response.js");

async function getAllMembers(req, res, next) {
    try {
        const members = await Member.findAll({
            attributes: [
                "code",
                "name",
                "penalty",
                "penaltyEndDate",
                "borrowedBooks",
                "borrowedDate",
            ],
        });
        return res
            .status(200)
            .json(new SuccessResponse("successfully get all data members.", members));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { getAllMembers };
