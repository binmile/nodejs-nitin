import { to } from "await-to-js";
import {
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  createUserService,
  getAllUsersService,
  signIn,
  getJwtTokenService,
  addRoleService,
  getFullProfileService,
  checkRoleChangePermissionService,
  updateRoleByRoleIdService
} from "../services/user.service.js";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../utility/constants.js";
import { responseHandler } from "../utility/responseHandler.js";
import {
  createUserValidator,
  signInUserValidator,
  updateUserValidator,
} from "../utility/validationSchemas/user.validation.js";
import {
  RoleValidator,
  updateRoleValidator,
} from "../utility/validationSchemas/role.validation.js";
to;
async function getUserByIDController(req, res) {
  const id = req.params.id;
  const [_, user] = await to(getUserByIdService(id));
  if (user) return responseHandler({ error: false, data: user, res });
  return responseHandler({ error: true, message: "user not found", res });
}

async function getUsersController(req, res) {
  const [err, users] = await to(getAllUsersService(req.query));
  if (err)
    return responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: true,
      message: err?.message,
      res,
    });
  return responseHandler({ data: users, res });
}

async function createUserController(req, res) {
  const user = req.body;
  const { error } = createUserValidator.validate(user);
  const [err, data] = await to(createUserService(user));
  console.log(data);
  if (err || error)
    return responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: true,
      message: err?.message || error?.message,
      res,
    });

  responseHandler({
    statusCode: RESPONSE_CODES.SUCCESS_CREATED,
    data: getJwtTokenService(data),
    res,
  });
}

async function updateUserController(req, res) {
  const id = req.params.id;
  const placeholder = req.query;
  try {
    const { error } = updateUserValidator.validate(placeholder);
    if (error) throw error;
    await updateUserByIdService(id, placeholder);
    responseHandler({ data: `update user id ${id}`, res });
  } catch (err) {
    responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_INT_SERVER_ERROR,
      error: true,
      message: err.message,
      res,
    });
  }
}

function deleteUserController(req, res) {
  const id = req.params.id;
  deleteUserByIdService(id);
  responseHandler({
    statusCode: RESPONSE_CODES.SUCCESS_OK,
    data: `deleted user id ${id}`,
    res,
  });
}

async function signInUserController(req, res) {
  const { error } = signInUserValidator.validate(req.body);
  const [err, data] = await to(signIn(req.body));
  if (error || err) {
    return responseHandler({
      statusCode: RESPONSE_CODES.FAILURE_SERVICE_UNAVAILABLE,
      error: true,
      message: err?.message || error?.message,
      res,
    });
  }

  responseHandler({
    res,
    data: data,
  });
}

const addRoleController = async (req, res) => {
  const { error } = RoleValidator.validate(req.body);
  if (error)
    return responseHandler({ res, error: true, message: error.message });
  req.body.userId = req.user.userId;
  const [err, role] = await to(addRoleService(req.body));
  if (err) return responseHandler({ res, error: true, message: err.message });
  responseHandler({ data: role, res });
};

const getFullProfileController = async (req, res) => {
  const userId = req.user.userId;
  const [err, fullProfile] = await to(getFullProfileService(userId));
  if (err) return responseHandler({ res, error: true, message: err.message });
  return responseHandler({ res, data: fullProfile });
};

const updateRoleController = async (req, res) => {
  const userId = req.user.userId;
  const roleId = req.params.id;
  const hasPermission = await checkRoleChangePermissionService(roleId, userId);

  if (!hasPermission)
    return responseHandler({
      res,
      statusCode: RESPONSE_CODES.FAILURE_FORBIDDEN_ACCESS,
      message: RESPONSE_MESSAGES.FAILURE_FORBIDDEN_ACCESS,
    });
  const { error } = updateRoleValidator.validate(req.body);
  if (error)
    return responseHandler({ res, error: true, message: error.message });

  const [err,data] =await to(updateRoleByRoleIdService(roleId,req.body));

  return responseHandler({ res });
};

export {
  deleteUserController,
  createUserController,
  updateUserController,
  getUserByIDController,
  getUsersController,
  signInUserController,
  addRoleController,
  getFullProfileController,
  updateRoleController,
};
