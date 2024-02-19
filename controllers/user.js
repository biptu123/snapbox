const User = require("../models/User");
const slugify = require("slugify");

const getUserController = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id);
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

module.exports = {
  getUserController,
};
