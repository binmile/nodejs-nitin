import { createUserController, deleteUserController, getUserByIDController, getUsersController, signInUserController, updateUserController, } from "../controllers/user.controller.js";
import { authUserMiddleware } from "../middleware/user.middleware.js";

app.get("/user/:id",authUserMiddleware, getUserByIDController)

app.get("/user", authUserMiddleware,getUsersController)

app.put('/user/:id',authUserMiddleware,updateUserController)

app.delete('/user/:id',authUserMiddleware,deleteUserController)

app.post('/user',createUserController)

app.post('/signIn',signInUserController)



