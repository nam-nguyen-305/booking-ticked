require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const bcrypt = require("bcryptjs");
const route = require("./routes");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const jwt_decode = require("jwt-decode");
const { auth, checkUser } = require("./util/auth");

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
// HTTP logger
app.use(morgan("combined"));

app.use(cors());
// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      iff: function (a, operator, b, opts) {
        var bool = false;
        switch (operator) {
          case "==":
            bool = a == b;
            break;
          case ">":
            bool = a > b;
            break;
          case "<":
            bool = a < b;
            break;
          default:
            throw "Unknown operator " + operator;
        }

        if (bool) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },
      for: function (n, block) {
        var accum = "";
        for (var i = 0; i < n; ++i) accum += block.fn(i);
        return accum;
      },
      disabledticket: function (text) {
        if (text == undefined) {
          return "";
        } else {
          return "disabled";
        }
        return "";
      },
      toLocaleString: function (number) {
        return number.toLocaleString();
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log(process.env.SECRET_KEY);
app.get("*", checkUser);
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
