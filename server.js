require('dotenv').config();
const app = require('./src/app');
const connectDB = async () => {
  try {
     const runDB = require('./src/config/db');
     await runDB();
  } catch (error) {
     console.error('Failed to connect to database', error);
  }
}

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});