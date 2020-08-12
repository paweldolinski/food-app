const User = require("../model/UserSchema");
const UserSession = require("../model/UserSessionSchema");
const crypto = require("crypto");
const { generateHash, validPassword, validateUser } = require("../model/utils");

const makeNewUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = req.body;
  const validationResult = validateUser(user);

  if (validationResult)
    return res.status(400).json({ message: validationResult });

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: `User with ${email} exist already` });
    } else {
      const newUser = new User({
        email,
        name,
        password: generateHash(password),
      });
      await newUser.save();
      return res.status(200).json({ message: "User has been created" });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;
  const user = req.body;
  const validationResult = validateUser(user);

  if (validationResult)
    return res.status(400).json({ message: validationResult });

  try {
    const user = await User.findOne({ email: email });
    if (!user || user === null) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    if (!validPassword(password, user.password)) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const { name, likedArr, _id } = user;
    const token = crypto.randomBytes(32).toString("hex");

    const userSession = new UserSession({ userId: _id, token });
    await userSession.save();
    return res.status(200).json({
      message: "Valid login",
      token: token,
      user: {
        name,
        likedArr,
        userId: _id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const session = UserSession.findOne({ token: authorization });
    const data = await session;

    if (!data) {
      return res.status(400).json({
        message: "Error: Invalid token",
      });
    }
    const { userId } = data;
    const user = User.findOne({ _id: userId });
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
    const session = UserSession.findOneAndDelete({
      token: authorization,
    });
    if (session) {
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
