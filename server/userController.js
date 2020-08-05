const User = require("./model/UserSchema");
const UserSession = require("./model/UserSessionSchema");
const crypto = require("crypto");

const makeNewUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    User.find(
      {
        email: email,
      },
      (err, previousUsers) => {
        if (err) {
          return res.status(500).json({
            message: "Error: Server error",
          });
        } else if (previousUsers.length > 0) {
          return res.status(400).json({
            message: "Error: Account already exist.",
          });
        }
      }
    );
    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.password = newUser.generateHash(password);
    const user = await newUser.save();
    res.status(201).json(user);
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
    User.find({ email: email }, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: "server error",
        });
      }
      if (users.length !== 1) {
        return res.status(400).json({
          message: "Invalid user",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
      const userSession = new UserSession();
      const token = crypto.randomBytes(32).toString("hex");
      userSession.userId = user._id;
      userSession.token = token;
      userSession.save((err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Server error",
          });
        }
        return res.status(200).json({
          message: "Valid login",
          token: token,
          user: {
            name: user.name,
            likedArr: user.favoriteList,
            userId: user._id,
          },
        });
      });
    });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { token } = req.headers.authorization;

  try {
    UserSession.find(
      {
        token: token,
        isDeleted: false,
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "Error: Server error",
          });
        }

        if (sessions.length !== 1) {
          return res.json({
            success: false,
            message: "Error: Invalid",
          });
        } else {
          User.find({ _id: token }, (err, users) => {
            if (err) {
              console.log(err);
            } else {
              const user = users[0];
            }
          });
          return res.json({
            success: true,
            message: "Good",
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const { token } = req.headers.authorization;
  try {
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false,
      },
      {
        $set: {
          isDeleted: true,
        },
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Error: Server error",
          });
        }
        return res.status(200).json({
          message: "Succesfully logged out",
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res, next) => {
  const { userId } = req.body;
  try {
    if (userId) {
      User.find({ _id: userId }, (err, user) => {
        if (err) {
          console.log(err, "error");
        } else {
          return res.json({
            user,
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

const addToFavorite = (req, res, next) => {
  const { dish, id } = req.body;
  try {
    if (id) {
      User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: {
            favoriteList: {
              dish,
              id: dish.id,
            },
          },
        },
        null,
        (err, user) => {
          if (err) {
            console.log(err);
            return res.json({
              success: false,
              message: "Error: Server error",
            });
          }
          return res.json({
            success: true,
            message: "Dish added",
            likedArr: user.favoriteList,
            newLikedDish: dish,
          });
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

const removeFromFavorite = (req, res, next) => {
  try {
    const { dishId, userId } = req.body;
    if (userId) {
      User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $pull: {
            favoriteList: {
              id: dishId,
            },
          },
        },
        null,
        (err, user) => {
          if (err) {
            console.log(err);
            return res.json({
              success: false,
              message: "Error: Server error",
            });
          }

          return res.json({
            success: true,
            message: user,
          });
        }
      );
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
  getUser,
  removeFromFavorite,
};
