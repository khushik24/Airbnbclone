const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(mongo_url);
  console.log("✅ Connected to DB");
}

main().catch((err) => console.log(err));

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("🧹 Old listings deleted");

    const listingsWithOwner = data.data.map((obj) => ({
      ...obj,
      owner: "690598f096e15d2c43efda01", // use your real user _id if needed
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("🌱 Database re-seeded successfully!");

  } catch (err) {
    console.error("❌ Error while seeding:", err);
  } finally {
    mongoose.connection.close();
  }
};

initDB();
