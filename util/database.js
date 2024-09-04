const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  mongoClient
    .connect(
      "mongodb+srv://sathyarjun007:TkC3Mu9iCC4wlMOH@cluster.8tv9n.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster"
    )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
