import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Seller from "./SellerModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },


    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    producttype: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // sellerId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true
    //     }
    // }

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Reference the Roles model
            key: 'id', // Assuming Roles has a primary key called 'id'
        },
        validate:{
            notEmpty: true
        }
    }


},{
    freezeTableName: true
});

Users.hasMany(Products, { foreignKey: 'userId' });
Products.belongsTo(Users, { foreignKey: 'userId' });

export default Products;