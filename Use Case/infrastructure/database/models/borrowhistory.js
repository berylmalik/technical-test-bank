"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BorrowHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BorrowHistory.init(
        {
            memberCode: DataTypes.STRING,
            bookCode: DataTypes.STRING,
            returned: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "BorrowHistory",
            tableName: "BorrowHistories",
        }
    );
    return BorrowHistory;
};
