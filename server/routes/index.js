const router = require("express").Router();
const todoRouter = require("./todo");
const loginRouter = require("./login");

router.use("/", todoRouter);
router.use("/", loginRouter);

module.exports = router;
