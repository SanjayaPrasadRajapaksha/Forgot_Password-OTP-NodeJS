import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
{
    dialect: "mysql",
    host: process.env.DB_HOST ="localhost",
}
);
export default sequelize;