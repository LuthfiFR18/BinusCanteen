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
    note: {
        type: DataTypes.STRING,
        allowNull: true,
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

    paymentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        
    }
    
}, {
    freezeTableName: true
});

Cart.hasMany(Products);
Cart.belongsTo(Products, { foreignKey: 'productId', targetKey: 'id'  });
Cart.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id'  });

export default Cart;
