import {Op} from "sequelize";
import { user } from "../models/User.model.js";
async function getUserByIdDbService(id) {
  return await user.findByPk(id);
}

async function createUserDbService(data) {
  return user.create(data);
}

async function getAllUsersDbService(query, placeholder, sort, q) {
  return {
    totalCount: await user.count({
      where: {
        ...placeholder,
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            phoneNumber: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      },
    }),
    user: await user.findAll({
      limit: query.limit,
      offset: query.offset,
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "email",
        "gender",
        "phoneNumber",
      ],
      where: {
        ...placeholder,
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            phoneNumber: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      },
      order: [sort],
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
