const {
  userAddedToDB,
  findUserOnDB,
  getUsersFromDB,
} = require("../../handlers/userHandlers");
const { validateUserData } = require("../../utils/userValidation");
const { generateToken } = require("../../utils/generateToken");


const createUser = async (userData) => {
  //validate the user

  validateUserData(userData);

  //  add user to DB
  const user = await userAddedToDB(userData);

  //  add the cookies

  const token = await generateToken(user);
  return { user, token };
};

const findUser = async (userData) => {
  //find user
  const user = await findUserOnDB(userData);

  //  add the cookies

  const token = await generateToken(user);
  return { user, token };
};

const getUsers = async (id) => {
  return await getUsersFromDB(id);
};

module.exports = { createUser, findUser, getUsers };
