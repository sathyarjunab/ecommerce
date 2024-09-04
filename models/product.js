const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    (this.title = title),
      (this.imageUrl = imageUrl),
      (this.description = description);
    this.price = price;
    this.id = id;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this.id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this.id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Product;
