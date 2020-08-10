const User = require("../model/UserSchema");
const UserSession = require("../model/UserSessionSchema");
const crypto = require("crypto");

const makeNewUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const user = await User.find({ email: email });
    if (user.length) {
      return res
        .status(400)
        .json({ message: `User with ${email} exist already` });
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.name = name;
      newUser.password = newUser.generateHash(password);
      await newUser.save();
      return res.status(200).json({ message: "User has been created" });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { password } = req.body;
  let { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Error: Password cannot be blank.",
    });
  }

  try {
    const user = await User.find({ email: email });

    if (user.length !== 1) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    if (!user[0].validPassword(password)) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const userSession = new UserSession();
    const token = crypto.randomBytes(32).toString("hex");
    userSession.userId = user[0]._id;
    userSession.token = token;
    await userSession.save();
    return res.status(200).json({
      message: "Valid login",
      token: token,
      user: {
        name: user[0].name,
        likedArr: user[0].likedArr,
        userId: user[0]._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { authorization } = req.headers;
  const { userId } = req.body;

  try {
    const sessions = UserSession.find({ token: authorization });
    const data = await sessions;
    const user = User.find({ _id: userId });

    if (data.length !== 1) {
      return res.status(400).json({
        message: "Error: Invalid token",
      });
    }
    return res.status(200).json({
      message: "Valid token",
      user: await user,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const user = UserSession.findOneAndDelete({
      token: authorization,
    });
    if (user) {
      return res.status(200).json({
        message: "User succesfully logged out",
      });
    }
  } catch (err) {
    next(err);
  }
};

const addToFavorite = async (req, res, next) => {
  const { dish, id } = req.body;
  try {
    const user = User.findOneAndUpdate(
      { _id: id },
      { $push: { likedArr: { dish, id: dish.id } } }
    );
    const data = await user;
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Dish added",
        likedArr: user.likedArr,
        newLikedDish: dish,
      });
    }
  } catch (err) {
    next(err);
  }
};

const removeFromFavorite = async (req, res, next) => {
  try {
    const { dishId, userId } = req.body;
    const user = User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          likedArr: {
            id: dishId,
          },
        },
      }
    );
    const data = await user;
    if (data) {
      return res.status(200).json({
        message: "Item deleted",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  makeNewUser,
  loginUser,
  verify,
  logout,
  addToFavorite,
  removeFromFavorite,
};
