const mongoose = require("mongoose");

 async function connectDb() {
   try {
     await mongoose.connect(process.env.MONGO_ATLAS_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     console.log("✅ MongoDB Atlas Connected...");
   } catch (err) {
     console.error("❌ Connection error:", err.message);
     process.exit(1);
   }
 }

module.exports = connectDb;
