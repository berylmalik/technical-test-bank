"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Member.belongsToMany(models.Book, {
                through: models.BorrowHistory,
                foreignKey: "memberCode",
                otherKey: "bookCode",
                as: "book",
            });
        }
    }
    Member.init(
        {
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            penalty: DataTypes.BOOLEAN,
            penaltyEndDate: DataTypes.DATE,
            borrowedBooks: DataTypes.INTEGER,
            borrowedDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Member",
            tableName: "Members",
        }
    );
    return Member;
};
