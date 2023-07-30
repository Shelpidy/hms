import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host:"127.0.0.1",
    dialect:"mysql",
    database:"hmsdb",
    password:"Mathematics23",
    username:"root",
});
export default sequelize;
