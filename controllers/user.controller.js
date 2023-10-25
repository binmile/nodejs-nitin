import {
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  createUserService,
  getAllUsersService,
} from "../services/user.service.js";
import { responseHandler } from "../utility/responseHandler.js";

async function getUserByIDController(req, res) {
  const id = req.params.id;
  const user = await getUserByIdService(id);
  if (user) return responseHandler({ error: false, data: user, res });
  return responseHandler({ error: true, message: "user not found", res });
}

async function getUsersController(req, res) {
  const users = await getAllUsersService(req.query);
  return responseHandler({ data: users, res });
}

async function createUserController(req, res) {
  const user = req.body;
  try {
   const data= await createUserService(user);
    responseHandler({ data: data.toJSON(), res });
  } catch (err) {
    responseHandler({
      statusCode:500,
      error: true,
      message: err.message,
      res,
    });
  }
}

async function updateUserController(req, res) {
  const id = req.params.id;
  const placeholder = req.query;
  try {
    await updateUserByIdService(id, placeholder);
    responseHandler({ data: `update user id ${id}`,res });
  } catch (err) {
    responseHandler({ error: true, message: err.message, res });
  }
}

function deleteUserController(req, res) {
  const id = req.params.id;
  deleteUserByIdService(id);
  responseHandler({ data: `deleted user id ${id}`, res });
}

export {
  deleteUserController,
  createUserController,
  updateUserController,
  getUserByIDController,
  getUsersController,
};
