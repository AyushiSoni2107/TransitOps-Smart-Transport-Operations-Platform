import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/transitops';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL || DEFAULT_LOCAL_URI;
  const isAtlasUri = mongoUri.includes('mongodb+srv://');

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
      ...(isAtlasUri ? { tls: true } : {})
    });

    console.log('MongoDB connected');
    return true;
  } catch (error) {
    const message = error?.message || String(error);
    console.error('MongoDB connection failed:', message);

    if (
      message.includes('SSL routines') ||
      message.includes('tlsv1 alert') ||
      message.includes('whitelist') ||
      message.includes('TLS') ||
      message.includes('ECONNRESET')
    ) {
      console.error('This typically means the Atlas cluster rejected the TLS handshake or your current IP is not allowed. Add your IP to Atlas Network Access or point MONGODB_URI at a local MongoDB instance.');
    } else {
      console.error('Check that MongoDB is running and that the connection URI is correct.');
    }

    return false;
  }
}
