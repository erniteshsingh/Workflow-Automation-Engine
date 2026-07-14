import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/database.config.js";
import "./src/config/redis.js";

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
