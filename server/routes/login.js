const router = require("express").Router();
const register = require("../models/register");

const { createHmac } = require("crypto");
const { checkEmailID, checkPassword } = require("../utils");

const secretAlgo = process.env.SECRET_ALGO;
const secretKey = process.env.SECRET_KEY;

const createHashedPassword = (password) => {
    const hmac = createHmac(secretAlgo, secretKey);
    return hmac.update(password).digest("hex");
};

const checkHashedPassword = (password, hashedPassword) => {
    return hashedPassword === createHashedPassword(password);
};

router.post("/login", async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const user = await register.findOne({ userEmail });
        if (!user) {
            throw new Error(`Email ID/Password does not match or exist`);
        }else if (checkHashedPassword(password, user.password)) {
            res.send(user);
        } else {
            throw new Error(`Email ID/Password does not match or exist`);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const existingUser = await register.findOne({ userEmail });
        if (existingUser) {
            // USER exist
            throw new Error(`Email ID already exists`);
        }
        checkEmailID(userEmail);
        checkPassword(password);
        const hashedPassword = createHashedPassword(password);
        const newUser = new register({ userEmail, password: hashedPassword });
        const user = await newUser.save();
        res.send(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
