const { User } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res, next) => {
    try {
        const { password, email, subscription } = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new Conflict("Email in use")
        }
        const result = await User.create({ password, email, subscription });
        res.status(201).json({
            Status: "success",
            code: 201,
            data: {
                user: {
                    email,
                    subscription: "starter"
                }
            }
        })
    
    } catch (error) {
        next(error);
    }
};

module.exports = register;