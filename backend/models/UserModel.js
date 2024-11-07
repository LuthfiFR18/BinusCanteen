import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Roles from "./RolesModel.js";


const {DataTypes} = Sequelize;

const Users = db.define('user',{
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

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

   

    phonenumber:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    image:{
        type: DataTypes.STRING,
        allowNull: true,
    },

    roleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Roles, // Reference the Roles model
            key: 'id', // Assuming Roles has a primary key called 'id'
        },
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
})


export default Users;