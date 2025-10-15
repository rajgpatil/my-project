import {Sequelize} from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();


export const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false 
})

try{
    await sequelize.authenticate()
    console.log("Database Connected")
}catch(err){
    console.log(err)
}