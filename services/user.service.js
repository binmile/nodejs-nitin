import {
  createRoleDbService,
  createUserDbService,
  deleteUserByIdDbService,
  getAllUsersDbService,
  getFullProfileDbService,
  getUserByEmailDbService,
  getUserByIdDbService,
  updateUserByIdDbService,
  getRoleByRoleIdAndUserIdDbService,
  updateRoleByIdDbService,
} from "../dbServices/user.db.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { securityConfig } from "../config/dbConfig.js";
import { createTransportOptions, sendMailService } from "../email/setup.js";
async function getUserByIdService(id) {
  return await getUserByIdDbService(id);
}

async function createUserService(data) {
  console.log(data);
  const hash = await bcrypt.hash(data.password, 12);
  data.password = hash;
  return createUserDbService(data);
}

async function signIn(data) {
  const { email, password } = data;
  const userOfSignIn = await getUserByEmailDbService(email);
  const result = await bcrypt.compare(password, userOfSignIn.password);
  console.log(result);
  if (result == true) {
    return getJwtTokenService(userOfSignIn);
  }
  throw new Error({ message: "Invalid password" });
}

function getJwtTokenService(data) {
  return {
    authToken: Jwt.sign(data.toJSON(), securityConfig.jwtSecret, {
      expiresIn: "20d",
    }),
  };
}

async function getAllUsersService(query) {
  const q = query?.q ?? "";
  console.log(q, "query");
  const limit = parseInt(query?.limit ?? "10");
  const pageNo = parseInt(query?.page ?? "1") - 1;
  const placeholder = {};
  let sort = ["userId", "ASC"];
  if (query.sortField && query.order) sort = [query.sortField, query.order];

  if (query.age) placeholder.age = query.age;
  if (query.firstName) placeholder.firstName = query.firstName;
  if (query.lastName) placeholder.lastName = query.lastName;
  if (query.email) placeholder.email = query.email;
  if (query.gender) placeholder.gender = query.gender;
  query.limit = limit;
  query.offset = pageNo * limit;

  return getAllUsersDbService(query, placeholder, sort, q);
}

async function deleteUserByIdService(id) {
  await deleteUserByIdDbService(id);
}
async function updateUserByIdService(id, placeholder) {
  await updateUserByIdDbService(id, placeholder);
}

async function addRoleService(role) {
  return await createRoleDbService(role);
}

async function getFullProfileService(userId) {
  return await getFullProfileDbService(userId);
}
async function checkRoleChangePermissionService(roleId, userId) {
  const role = await getRoleByRoleIdAndUserIdDbService(roleId, userId);

  return role != null;
}
async function updateRoleByRoleIdService(roleID, data) {
  return await updateRoleByIdDbService(roleID, data);
}

async function userCreationNotificationService(email) {
  const option = createTransportOptions({
    to: email,
    subject: "success fully created",
    text: "Your account is now available to be used",
  });

  return await sendMailService(option);
}

async function userAuthNotificationService(email) {
  const option = createTransportOptions({
    to: email,
    subject: "some One has logged in to your account",
    text: "Your account has been loggedIn by " + new Date().toString(),
  });
  return await sendMailService(option);
}
export {
  userAuthNotificationService,
  userCreationNotificationService,
  addRoleService,
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
  getAllUsersService,
  signIn,
  getJwtTokenService,
  getFullProfileService,
  checkRoleChangePermissionService,
  updateRoleByRoleIdService,
};
