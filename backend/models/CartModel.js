import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductsModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Cart = db.define('cart', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    
}, {
    freezeTableName: true
});



export default Cart;
