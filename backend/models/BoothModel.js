import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Booth = db.define('booth',{
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

    openingTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    closingTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, 
            key: 'id', // Assuming Roles has a primary key called 'id'
        },
        validate:{
            notEmpty: true
        }
    }

    

},{
    freezeTableName: true
})








export default Booth;