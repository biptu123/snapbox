const User = require("../models/User");
const slugify = require("slugify");

const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    else {
      return res.status(200).send({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    else {
      return res.status(200).send({
        success: true,
        users,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUserController,
  getAllUserController,
};
