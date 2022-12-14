import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { dbConnection } from "./src/config/dbConnection.js";
import {
  facebookStrategies,
  googleStrategies,
} from "./src/config/passport-setup-auth.js";
import authRoute from "./src/routes/authRoute.js";
const app = express();
dotenv.config();

//Database Connect
dbConnection();
googleStrategies();
facebookStrategies();

//middleware
//Middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1024px" }));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//status api
app.get("/", (req, res) =>
  res.status(200).send(`<h1>Server is up and running</h1>`)
);

//routes
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(
    chalk.bgYellowBright.bold(
      `Server is up and running on PORT ${process.env.PORT}`
    )
  );
});
