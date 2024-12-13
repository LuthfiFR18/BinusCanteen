import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Order = db.define('order', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Reference the Users model
            key: 'id', // Assuming Users has a primary key called 'id'
        }
    },

    deliveryLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    }

},{

    freezeTableName: true,
});



export default Order;