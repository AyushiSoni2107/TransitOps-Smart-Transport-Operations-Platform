import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = process.env.PORT || 5000;

const dbConnected = await connectDatabase();

app.listen(port, () => {
  console.log(`API server running on port ${port}`);

  if (!dbConnected) {
    console.warn('The API is running without a database connection. Some routes may fail until MongoDB is reachable.');
  }
});
