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
  return  createUserDbService(data);
}

async function getAllUsersService(query) {
    const q= query?.q ?? "";
    console.log(q,"query");
    const limit = parseInt(query?.limit ?? "10");
    const pageNo = parseInt(query?.page ?? "1") - 1;
    const placeholder = {};
    let sort = ["userId","ASC"];
    if(query.sortField && query.order) sort = [query.sortField,query.order]; 

    if(query.age) placeholder.age = query.age;
    if(query.firstName) placeholder.firstName = query.firstName;
    if(query.lastName) placeholder.lastName = query.lastName;
    if(query.email) placeholder.email = query.email;
    if(query.gender) placeholder.gender = query.gender;
   query.limit = limit;
   query.offset = pageNo * limit;

  return getAllUsersDbService(query,placeholder,sort,q);
}

async function deleteUserByIdService(id) {
  await deleteUserByIdDbService(id);
}
async function updateUserByIdService(id, placeholder) {
  await updateUserByIdDbService(id, placeholder);
}

export {
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
  getAllUsersService,
};
