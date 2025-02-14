import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Booth from "./BoothModel.js";

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

    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },    

    boothId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Booth,
            key: 'id',
        },
        validate:{
            notEmpty: true
        }
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
        validate:{
            notEmpty: true
        }
    }


},{
    freezeTableName: true
});



export default Products;