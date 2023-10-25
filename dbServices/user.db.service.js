import { user } from "../models/User.model.js";

async function getUserByIdDbService(id) {
  return await user.findByPk(id);
}

async function createUserDbService(data) {
  const createdUser = await user.create(data);
  return createdUser;
}

async function getAllUsersDbService(query) {
  const limit = parseInt(query?.limit ?? "10");
  const pageNo = parseInt(query?.page ?? "1") - 1;
  return {
    totalCount : await user.count(),
    user: await user.findAll({
      limit: limit,
      offset: pageNo * limit,
      attributes: ["userId", "firstName", "lastName"],
    }),
  };
}

async function deleteUserByIdDbService(id) {
  await user.destroy({
    where: {
      userId: id,
    },
  });
}
async function updateUserByIdDbService(id, placeholder) {
  return await user.update(placeholder, {
    where: { userId: id },
  });
}

export {
  getUserByIdDbService,
  createUserDbService,
  updateUserByIdDbService,
  deleteUserByIdDbService,
  getAllUsersDbService,
};
