import { Sequelize } from "sequelize";

console.log(Sequelize)
const sequelize = new Sequelize("hmsdb","root","",{
    host: "127.0.0.1",
    dialect: "mysql",
});

const  testConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
export default sequelize;
