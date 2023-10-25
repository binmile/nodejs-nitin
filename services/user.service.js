import Joi from "joi";
import {
  createUserDbService,
  deleteUserByIdDbService,
  getAllUsersDbService,
  getUserByIdDbService,
  updateUserByIdDbService,
} from "../dbServices/user.db.service.js";

async function getUserByIdService(id) {
  return await getUserByIdDbService(id);
}

async function createUserService(data) {
  const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().alphanum().min(8).required(),
  });
  const { error } = userSchema.validate(data);
  if (error) {
    throw error;
  }
  return await createUserDbService(data);
}

async function getAllUsersService(query) {
  return getAllUsersDbService(query);
}

async function deleteUserByIdService(id) {
  await deleteUserByIdDbService(id);
}
async function updateUserByIdService(id, placeholder) {
  const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20),
    lastName: Joi.string().alphanum().min(3).max(20),
    password: Joi.string().alphanum().min(8),
  });
  const { error } = userSchema.validate(placeholder);

  if (error) throw error;

  await updateUserByIdDbService(id, placeholder);
}

export {
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
  getAllUsersService,
};
