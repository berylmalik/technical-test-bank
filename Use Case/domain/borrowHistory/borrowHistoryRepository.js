const { sequelize } = require("../../infrastructure/database/models");
const { SuccessResponse, ErrorResponse } = require("../../infrastructure/api/utils/response.js");

async function getBooksBorrowedByMembers(req, res, next) {
    try {
        const query = `
            SELECT
                "memberCode",
                COUNT("bookCode") AS "booksBorrowed"
            FROM
                "BorrowHistories"
            GROUP BY
                "memberCode"
        `;

        const [booksCountByMember, _] = await sequelize.query(query);

        return res
            .status(200)
            .json(
                new SuccessResponse(
                    "Successfully retrieved books count by member.",
                    booksCountByMember
                )
            );
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = { getBooksBorrowedByMembers };
