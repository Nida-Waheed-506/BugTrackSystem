const { createUser, findUser } = require("./userController");

const addUser = async (req, res) => {
  try {
    const { user, token } = await createUser(req.body);
    // 8 hours × 60 minutes × 60 seconds × 1000 milliseconds
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

    res.json({ message: "Sign up Successfully ", data: user });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Invalid email format",
      });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
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
    const user = await findUser(req.body);
    if (user)
      res.json({ message: "User is logged in successfully", data: user });
    else throw new Error("Invalid credentials");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addUser, getUser };
