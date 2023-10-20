import { user } from "../models/User.model.js";

async function getUserByIdService(id) {
   return await user.findByPk(id)
}

async function createUserService(data) {
    const createdUser = await user.create(data);
    return createdUser;
}

async function getAllUsersService() {
    return await user.findAll();
}

async function deleteUserByIdService(id) {
    await user.destroy({where:{
        userId:id
    }});
}
async function updateUserByIdService(id,placeholder) {
  return  await user.update(placeholder,
    {
        where: {userId:id}
    })
}

export {getUserByIdService,createUserService,updateUserByIdService,deleteUserByIdService,getAllUsersService }