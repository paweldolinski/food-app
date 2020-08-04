const router = require("express").Router();
const User = require("./../../model/UserSchema");
const UserSession = require("./../../model/UserSessionSchema");

router.route("/register").post((req, res, next) => {
  const { body } = req;
  const { password, name } = body;
  let { email } = body;
  if (!email) {
    return res.json({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }
  if (!name) {
    return res.json({
      success: false,
      message: "Error: Name cannot be blank.",
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        return res.json({
          success: false,
          message: "Error: Account already exist.",
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.name = name;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.json({
          success: true,
          message: "Signed up",
        });
      });
    }
  );
});

router.route("/login").post((req, res) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.json({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  email = email.toLowerCase();
  User.find({ email: email }, (err, users) => {
    if (err) {
      return res.json({
        success: false,
        message: "server error",
      });
    }
    if (users.length !== 1) {
      return res.json({
        success: false,
        message: "Invalid user",
      });
    }

    const user = users[0];
    if (!user.validPassword(password)) {
      return res.json({
        success: false,
        message: "Invalid pasword",
      });
    }
    const userSession = new UserSession();
    userSession.userId = user._id;

    userSession.save((err, doc) => {
      if (err) {
        return res.json({
          success: false,
          message: "Server error",
        });
      }
      return res.json({
        success: true,
        message: "Valid sisdfsdfgn in",
        token: doc._id,
        user: {
          name: user.name,
          likedArr: user.favoriteList,
          userId: user._id,
        },
      });
    });
  });
});

router.route("/user").post((req, res) => {
  const { body } = req;
  const { userId } = body;
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
});

router.route("/verify").get((req, res) => {
  const { query } = req;
  const { token } = query;

  UserSession.find(
    {
      _id: token,
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
});

router.route("/logout").get((req, res) => {
  const { query } = req;
  const { token } = query;

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
        return res.json({
          success: false,
          message: "Error: Server error",
        });
      }

      return res.json({
        success: true,
        message: "Good",
      });
    }
  );
});

router.route("/addToFavorite").post((req, res) => {
  const { body } = req;
  const { dish, id } = body;

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
});

router.route("/removeFromFavorite").post((req, res) => {
  const { body } = req;
  const { dishId, userId } = body;
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
});

module.exports = router;
