import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const db = mongoose
  .connect(process.env.MONGODB_URI, options)
  .then((res) => {
    if (res) {
      console.log("Database connection successful");
    }
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
