import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductsModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Order = db.define('order', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    boothId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    freezeTableName: true
});

// Relationships
Order.belongsTo(Users, { foreignKey: 'userId' });
Order.belongsTo(Products, { foreignKey: 'productId' });

export default Order;
