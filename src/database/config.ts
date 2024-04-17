// db.ts
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB || 'mongodb://localhost:27017/simple_store_api'; // Fallback to a default connection string

    const options: ConnectOptions = {
        retryWrites: true, w: 'majority' 
    };

    await mongoose.connect(dbUrl, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
