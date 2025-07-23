const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const userAddedToDB = async (userData) => {
  const { name, email, password, user_type, mobile_number } = userData;

  const hashedPassword = await bcrypt.hash(password, 10); //10 salt round 2^10 times , strong password

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    user_type: user_type,
    mobile_number: mobile_number,
  });
  return user;
};

const findUserOnDB = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) throw new Error("Invalid Credentials");
  const passwordHash = await bcrypt.compare(password, user.password);
  if (!passwordHash) throw new Error("Invalid Credentials");
  return user;
};

const getUsersFromDB = async (id) => {
  return await User.findAll({ where: { id: { [Op.ne]: id } } });
};

module.exports = { userAddedToDB, findUserOnDB, getUsersFromDB };
