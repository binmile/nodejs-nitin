import { user } from "../models/User.model.js";

async function getUserByIdDbService(id) {
  return await user.findByPk(id);
}

async function createUserDbService(data) {
  const createdUser = await user.create(data);
  return createdUser;
}

async function getAllUsersDbService(query,placeholder,sort) {
  
  return { 
    totalCount : await user.count({where:placeholder}),
    user: await user.findAll({
      limit: query.limit,
      offset: query.offset,
      attributes: ["userId", "firstName", "lastName","email","gender","phoneNumber"], 
      where:placeholder,
      order : [sort]
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
