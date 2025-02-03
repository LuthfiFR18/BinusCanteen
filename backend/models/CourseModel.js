import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Courses = db.define('course', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100] 
        }
    },
    courseRoom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50] 
        }
    },

    courseFloor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50] 
        }
    },
    courseDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: false,
            
        }
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    //Primary Key
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, 
            key: 'id' 
        },
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});



export default Courses;
