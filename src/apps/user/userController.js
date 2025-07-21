const { userAddedToDB, findUserOnDB } = require("../../handlers/userHandlers");
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
  return await findUserOnDB(userData);
};

module.exports = { createUser, findUser };
