const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66d97430acf74d84a7db97d9")
    .then((user) => {
      if (!user) {
        user = new User({
          name: "dddd",
          email: "dnin@Nini",
          cart: {
            item: [],
          },
        });
        return user.save().then((result) => {
          return result;
        });
      } else {
        return user;
      }
    })
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sathyarjun007:TkC3Mu9iCC4wlMOH@cluster.8tv9n.mongodb.net/shop"
  )
  .then(() => {
    console.log("connected");
    app.listen(3000, () => {
      console.log("listening to port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
