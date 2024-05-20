"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BorrowHistories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            memberCode: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "Members",
                    key: "code",
                },
            },
            bookCode: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "Books",
                    key: "code",
                },
            },
            returned: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("BorrowHistories");
    },
};
