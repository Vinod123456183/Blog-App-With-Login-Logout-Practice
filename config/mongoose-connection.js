const mongoose = require("mongoose");
const debug = require("debug")("app:db");

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("✅ ✅ ✅ ✅ Connected to MongoDB ✅ ✅ ✅ ✅"))
  .catch((err) =>
    console.log(
      "❌ ❌ ❌ ❌ ❗ Error connecting to MongoDB: ❌ ❌ ❌ ❌ ❗ ",
      err
    )
  );

const db = mongoose.connection;

db.on("error", (err) =>
  debug("❗❌ ❌ ❌ ❌ MongoDB connection error : ❌ ❌ ❌ ❌ ❗ ", err)
);
db.once("open", () =>
  debug("✅ ✅ ✅ ✅ MongoDB connection established ✅ ✅ ✅ ✅")
);

module.exports = db;
