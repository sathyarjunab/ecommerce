const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(name, email) {
    (this.name = name), (this.email = email);
  }
  save() {
    const db = getDb();
    return db
      .collection("User")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findUserbyID(prodId) {
    const db = getDb();
    return db.collection("User").findOne({ _id: new mongodb.ObjectId(prodId) });
  }
}

module.exports = User;
