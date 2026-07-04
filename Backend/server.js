import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.config.js";

dotenv.config();
console.log(process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
