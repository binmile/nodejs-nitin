import { createUserController, deleteUserController, getUserByIDController, getUsersController, updateUserController, } from "../controllers/user.controller.js";

app.get("/user/:id", getUserByIDController)

app.get("/user", getUsersController)

app.put('/user/:id',updateUserController)

app.delete('/user/:id',deleteUserController)

app.post('/user',createUserController)



