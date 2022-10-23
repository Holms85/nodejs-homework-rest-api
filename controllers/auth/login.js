const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const joiLoginSchema = require("../../models/user");
const bcrypt = require("bcryptjs");

const login = async(req, res, next) => { 
    try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const passwordCompare = bcrypt.compareSync(password, user.password);
        if (!user || !passwordCompare) {
            throw new Unauthorized("Email or password is wrong");
        }
        const token = "1234rtyu.d324e8fk.dhjej33sdfrr3a";
        res.json({
            token
        })
} catch (error) {
    next(error)
}
};

module.exports = login;