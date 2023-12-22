const express = require("express");
let cors = require("cors");
const jwt = require("jsonwebtoken");

// import routes
const signupRouter = require("./routers/signup");
const loginRouter = require("./routers/login");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Auth API");
});

// Set up middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " " + req.ip);
  next();
});
// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make routes avalible
app.use("/v1/signup", signupRouter);
app.use("/v1/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
