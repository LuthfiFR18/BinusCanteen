import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductsModel.js";
import Users from "./UserModel.js";
import Order from "./OrderModel.js";

const {DataTypes} = Sequelize;

const OrderDetails = db.define('orderDetails', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order, // Reference the Products model
            key: 'id', // Assuming Products has a primary key called 'id'
        },
        validate:{
            notEmpty: true
        }
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products, // Reference the Products model
            key: 'id', // Assuming Products has a primary key called 'id'
        },
        validate:{
            notEmpty: true
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Reference the Users model
            key: 'id', // Assuming Users has a primary key called 'id'
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },

    productDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
    
}, {
    freezeTableName: true
});



export default OrderDetails;
