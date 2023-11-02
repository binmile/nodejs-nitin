import "./App.js";
import "./database/dataSource.js";
import {user} from "./models/User.model.js";
import {Role} from  "./models/Role.model.js";



import "./routes/user.routes.js";

Role.belongsTo(user,{
    foreignKey:'userId',
})

user.hasMany(Role,{

     foreignKey:"userId"
})








app.listen(8000,()=>{
 console.log("http://localhost:8000");
})