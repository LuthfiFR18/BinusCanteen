import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Payment = db.define('payment', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        
    },

    cartId: {
        type: DataTypes.STRING,
        allowNull: false,
        
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

    deliveryLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
    
}, {
    freezeTableName: true
});



export default Payment;
