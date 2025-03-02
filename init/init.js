const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");

const MONGODB_URL = "mongodb://127.0.0.1:27017/stayzy";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGODB_URL);
}

const initDB = async () => {
  // to delete previous data
  await Listing.deleteMany({});
  // to initialise data
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67ac1732035c90bf2e1cec5b",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialised");
};

initDB();
