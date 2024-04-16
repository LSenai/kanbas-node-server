import express from 'express';
import mongoose from 'mongoose';

import UserRoutes from "./Users/routes.js";

import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';

import Hello from './Hello.js';
import Lab5 from './Lab5.js';

import cors from "cors";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/kanbas")
  .then(() => {
    console.log("MongoDB successfully connected");
    // Ensure the server starts listening only after the DB connection is successful
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));


const app = express();
app.use(cors());
app.use(express.json())

// Define a simple route to check the database connection
app.get('/db-status', async (req, res) => {
    try {
      const dbStatus = await mongoose.connection.db.admin().serverStatus();
      res.status(200).json({ success: true, status: dbStatus });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app); 
Hello(app);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});