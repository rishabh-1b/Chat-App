const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log("Database connnected successfully"))
    .catch((error) => {
      console.log(`Error occurred while connecting the database : ${error.message}`);
      process.exit(1);
    }
    )
}

module.exports = dbConnect;