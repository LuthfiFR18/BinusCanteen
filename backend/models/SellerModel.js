import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Products from "./ProductsModel.js";
import Users from "./UserModel.js";




const {DataTypes} = Sequelize;

const Seller = db.define('seller',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    boothname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },

    openingTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }

    

},{
    freezeTableName: true
})

// Seller.hasMany(Products, { foreignKey: 'sellerId' });
// Products.belongsTo(Seller, { foreignKey: 'sellerId' });

// Users.hasOne(Seller, { foreignKey: 'userId' });
// Seller.belongsTo(Users, { foreignKey: 'userId' });


export default Seller;