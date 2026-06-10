const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Law = require("./models/Law");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding.");

    const dataPath = path.join(__dirname, "data", "laws.json");
    const lawsData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Clear existing data to avoid duplicates on multiple runs
    await Law.deleteMany();
    console.log("Cleared existing laws.");

    await Law.insertMany(lawsData);
    console.log("Successfully seeded database with laws.json data.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
