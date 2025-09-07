const app = require("./src/app");
const connectDb = require("./src/db/db");
require("dotenv").config();

connectDb();
app.listen(3000, () => {
  console.log("server started at port 3000");
});
