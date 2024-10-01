import express from 'express';
import sequelize from './Configs/db.config.js';
import userRoutes from './Routes/user.route.js';
import dotenv from 'dotenv';

dotenv.config();  // Load .env file into process.env

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Database connection
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
