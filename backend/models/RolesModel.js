import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Seller from "./SellerModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Roles = db.define('roles',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    roletype:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
            
        }
    }


},{
    freezeTableName: true
})

//Roles.hasMany(Seller)
//Roles.hasMany(Users)
//Users.belongsTo(Roles, {foreignKey: 'roleId'})


export default Roles;