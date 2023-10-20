import "./App.js";
import { db } from "./database/dataSource.js";
import { user } from "./models/User.model.js";



import "./routes/user.routes.js";






app.listen(8000,()=>{
 console.log("http://localhost:8000");
})