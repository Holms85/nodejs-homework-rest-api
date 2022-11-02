const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const {joiRegisterSchema} = require("../../models/user");

const register = async (req, res, next) => {
    try {
        const { error } = joiRegisterSchema.validate(req.body);
        if (error) {
          error.status = 400;
          error.message = "missing required name field";
          throw error;
        }
        const { password, email, subscription } = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new Conflict("Email in use")
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const avatarUrl = gravatar.url(email);
        const result = await User.create({ password: hashPassword, email, subscription, avatarUrl });
        res.status(201).json({
            Status: "success",
            code: 201,
            data: {
                user: {
                    email: result.email,
                    subscription: result.subscription,
                    avatarUrl
                }
            }
        })
    
    } catch (error) {
        next(error);
    }
};

module.exports = register;