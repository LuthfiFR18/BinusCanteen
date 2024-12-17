import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Order from "./OrderModel.js";

const {DataTypes} = Sequelize;

const Payment = db.define('payment', {

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
            model: Order,
            key: 'id',
        },
        validate:{
            notEmpty: true
        }
    },

    paymentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    },
    
}, {
    freezeTableName: true
})



export default Payment;
