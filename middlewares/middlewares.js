const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");

const configureMiddleware = async (app) => {
    // Configure CORS
    const corsOptions = {
        origin: [process.env.CLIENT_URL , process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    app.use(cors(corsOptions));

    // Initialize Redis client
    let redisClient = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    // Connect Redis client
    redisClient
        .connect()
        .then(() => {
            console.log("Redis client connected");
        })
        .catch((error) => {
            console.log("Error connecting to Redis:", error);
        });

    // Initialize Redis store
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "keetlo:",
    });

    // Configure express-session with Redis
    app.use(
        session({
            store: redisStore, // Your Redis store
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                httpOnly: true, // Prevent JavaScript access
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            },
        })
    );

    // Other middlewares
    if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1);
    }
    app.use(cookieParser());
    app.use(express.json({ limit: "50mb" })); // Handle JSON requests
    app.use(express.urlencoded({ extended: false })); // Handle URL-encoded requests
    app.use("/images", express.static(path.join(__dirname, "../public/images")));
};

// Export both the middleware configuration function 
module.exports = { configureMiddleware };
