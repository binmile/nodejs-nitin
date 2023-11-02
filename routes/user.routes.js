import {
  addRoleController,
  createUserController,
  deleteUserController,
  getFullProfileController,
  getUserByIDController,
  getUsersController,
  signInUserController,
  updateUserController,
  updateRoleController,
} from "../controllers/user.controller.js";
import { updateRoleMiddleware } from "../middleware/role.middleware.js";
import { authUserMiddleware } from "../middleware/user.middleware.js";

app.get("/user/:id", authUserMiddleware, getUserByIDController);

app.get("/user", authUserMiddleware, getUsersController);

app.put("/user/:id", authUserMiddleware, updateUserController);

app.delete("/user/:id", authUserMiddleware, deleteUserController);

app.post("/user", createUserController);

app.post("/signIn", signInUserController);

app.post("/addRole", authUserMiddleware, addRoleController);

app.put("/updateRole/:id", authUserMiddleware,updateRoleMiddleware, updateRoleController);

app.get("/getFullProfile", authUserMiddleware, getFullProfileController);
