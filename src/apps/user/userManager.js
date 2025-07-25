const { createUser, findUser, getUsers } = require("./userController");

const addUser = async (req, res) => {
  try {
    const { user, token } = await createUser(req.body);
    // 8 hours × 60 minutes × 60 seconds × 1000 milliseconds
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.status(201).json({ message: "Sign-up Successfully ", data: user });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Invalid email format",
      });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    //   Errors which thrown by Error instance
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unexpected error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { user, token } = await findUser(req.body);
    if (user) {
      // 8 hours × 60 minutes × 60 seconds × 1000 milliseconds
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json({ message: "Logged-in successfully", data: user });
    } else throw new Error("Invalid credentials");
  } catch (error) {
    res.status(404).json({ error : error.message });
  }
};

const getAllUsersFunc = async (req, res) => {
  try {
    const {id} = req.user;
    const users = await getUsers(id);
    if (!users) throw new Error("No user exist");
    res.status(200).json({ message: "Users Detail ", data: users });
  } catch (error) {
    res.status(400).json({ error : error.message });
  }
};


module.exports = { addUser, getUser, getAllUsersFunc };
