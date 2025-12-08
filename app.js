const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const limitter = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
require("dotenv").config();
require("express-async-errors");
//Builtin Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(sanitize());
app.use(
  limitter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

//Routes
const { AuthRouter, UserRouter, RequestRouter } = require("./routes");
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/request", RequestRouter);

//Error Handle
const notFound = require("./Middleware/notFound");
const errorHandle = require("./Middleware/errorHandle");
app.use(notFound);
app.use(errorHandle);

//Start
const port = process.env.PORT || 5000;
const { hrConnect } = require("./connections/hrConnection");
const start = async (url) => {
  await hrConnect(url);
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
  app.listen(port, "0.0.0.0", () => {
    console.log(`Running On ${port}`);
  });
};

start(process.env.MONGO_URI);
