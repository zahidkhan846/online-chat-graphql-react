const { User } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getUsers: async (parant, args, { user }) => {
      console.log(user);
      try {
        if (!user) throw new AuthenticationError("Unauthenticated!");
        const users = await User.findAll({
          where: {
            email: {
              [Op.ne]: user.email,
            },
          },
        });
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    login: async (parant, args) => {
      const { email, password } = args;
      const errors = {};
      try {
        if (email.trim() === "") {
          errors.email = "email must not be empty";
          throw new UserInputError("email empty", { errors });
        }
        if (password.trim() === "") {
          errors.password = "password must not be empty";
          throw new UserInputError("password empty", { errors });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
          errors.email = "user email not found";
          throw new UserInputError("user email does not exist", { errors });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          errors.password = "incorrect password";
          throw new UserInputError("incorrect password", { errors });
        }

        const token = jwt.sign({ email }, env.secret_key, {
          expiresIn: 60 * 60,
        });

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token: token,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    registerUser: async (parant, args) => {
      const { username, email, password, confirmPassword } = args;

      const errors = {};

      try {
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (email.trim() === "") errors.email = "email must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "confirm password must not be empty";

        if (password !== confirmPassword)
          errors.password = "Password doesn't match";

        // const existingUser = await User.findOne({ where: { email } });

        // if (existingUser)
        //   errors.email = "User already exist please try another email.";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const hashedPassword = await bcrypt.hash(password, 6);
        const newUser = await User.create({
          username: username,
          password: hashedPassword,
          email: email,
        });

        return newUser;
      } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
          error.errors.forEach(
            (e) =>
              (errors[e.path] = `${e.path.replace(
                "users.email",
                "email"
              )} already taken`)
          );
        } else if (error.name === "SequelizeValidationError") {
          error.errors.forEach((e) => (errors[e.path] = e.message));
        }

        throw new UserInputError("Invalid Input", { errors });
      }
    },
  },
};
