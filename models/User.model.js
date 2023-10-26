import { db } from "../database/dataSource.js";
import {DataTypes} from 'sequelize';
const user=db.define("User",{
    userId:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type : DataTypes.STRING,
        allowNull:false
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull:false
    },
    password : {
        type : DataTypes.STRING,
        allowNull:false
    },
    email : {
        type : DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    age : {
        type : DataTypes.INTEGER,
        allowNull:false
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true 
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        values:["male","female"]
    }  

});







// global.user = user;

export {user}

