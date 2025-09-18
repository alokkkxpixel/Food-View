require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");
console.log("Env loaded PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);

connectDb();
app.listen(3000, () => {
  console.log("server started at port 3000");
});
