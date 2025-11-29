import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';


mongoose.set("bufferCommands", false); // buffering disable
mongoose.set("strictQuery", true);     // strict query mode enable


async function main() {
  try {
    console.log("DATABASE_URL:", config.database_url);
    console.log("Connecting to MongoDB...");
    await mongoose.connect(config.database_url);
    console.log("Connected!");

    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
  }
}

main();