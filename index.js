const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
process.env.APP_PATH = process.env.APP_PATH || __dirname;

const app = express();

const bundler = require("./config");
const router = require("./server/routes");
const middlewares = require("./server/middlewares");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(express.static("assets"));

app.use("/api", router);
app.use(bundler.middleware());

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
