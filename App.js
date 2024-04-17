import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import connectMongo from "connect-mongo";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';

const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

// Configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true
}));

// Session configuration
const MongoStore = connectMongo.create({ 
    mongoUrl: CONNECTION_STRING,
    collectionName: 'sessions',
    dbName: 'kanbas'
});

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV === "development" ? 'lax' : 'none'
    }
};

if (process.env.NODE_ENV !== 'development') {
    sessionOptions.cookie = {
        sameSite: 'none',
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));

// Parse JSON bodies
app.use(express.json());

// Define routes
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

// Database connection and server start
mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB successfully connected");
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}, using MongoDB at ${CONNECTION_STRING}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop the server if unable to connect to the database
});

// Simple route to check the database connection
app.get('/db-status', async (req, res) => {
    try {
      const dbStatus = await mongoose.connection.db.admin().serverStatus();
      res.status(200).json({ success: true, status: dbStatus });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
});
