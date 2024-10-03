import { Sequelize } from "sequelize";

const db = new Sequelize('binuscanteen', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;