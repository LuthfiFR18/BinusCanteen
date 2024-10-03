import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Order from "./OrderModel.js";

const {DataTypes} = Sequelize;

const Payment = db.define('payment', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },

    deliveryLocation: {
        type: DataTypes.STRING,
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
    }
}, {
    freezeTableName: true
});

// Relationships
Payment.belongsTo(Order, { foreignKey: 'orderId' });
// Payment.belongsTo(Users, { foreignKey: 'userId' });

export default Payment;
