const pool = require("../database/index");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const UPLOAD_DIR = path.join(__dirname, "../public/images/users");

const usersController = {
    signup: async (req, res) => {
        try {
            const { name, email, password, confirmPassword } = req.body;
    
            // Validation checks
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }
    
            // Password validation
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
    
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters" });
            }
    
            // Check if email already exists
            const [existingUser] = await pool.query(
                `SELECT email FROM users WHERE email = ?`,
                [email]
            );
            if (existingUser.length > 0) {
                return res.status(400).json({ message: "Email is already registered" });
            }
    
            // Generate unique user_code
            const userCode = `UC-${uuidv4().split('-')[0]}`; // Generates a unique code like "UC-123e4567"
    
            // Hash password before saving to database
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Insert user into the database
            await pool.query(
                `
                    INSERT INTO users (user_code, name, email, password, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, NOW(), NOW())
                `,
                [userCode, name, email, hashedPassword]
            );
    
            res.status(201).json({ message: "User registered successfully", userCode });
        } catch (error) {
            console.log("Signup error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password, rememberMe } = req.body;
    
            // Validate input
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
    
            // Check if user exists in the database
            const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
            const user = rows[0];
    
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
    
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
    
            // Set session
            req.session.user = {
                id: user.user_id,
                user_code: user.user_code,
                email: user.email,
                name: user.name,
            };
            // Configure session cookie expiration
            if (rememberMe) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            } else {
                req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // 1 day
            }
    
            // Respond to the client
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.user_id,
                    email: user.email,
                    name: user.name,
                },
            });
        } catch (error) {
            console.log("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },    
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
                return res.status(500).json({ message: "Logout failed." });
            }
            res.clearCookie("connect.sid"); // Clear session cookie
            res.status(200).json({ message: "Logout successful." });
        });
    },
    status: async (req, res) => {
        try {
            // Check if user session exists
            if (!req.session.user || !req.session.user.id) {
                return res.status(401).json({ message: "Unauthorized. Please log in." });
            }
    
            const userId = req.session.user.id;
    
            // If not in Redis, fetch user info from MySQL database
            const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [userId]);
            const user = rows[0];
    
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            // Respond with user info
            res.status(200).json({
                id: user.user_id,
                user_code: user.user_code,
                email: user.email,
                google_email: user.google_email,
                facebook_email: user.facebook_email,
                apple_email: user.apple_email,
                name: user.name,
                image: user.image,
                timezone: user.timezone,
                created_at: user.created_at,
                updated_at: user.updated_at,
            });
        } catch (error) {
            console.log("Error fetching user info:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { name, timezone, image } = req.body;
    
            // Validate inputs
            if (!name || !timezone) {
                return res.status(400).json({ message: "Name and timezone are required." });
            }
 
            // Get user ID and user_code from session
            const { id: userId, user_code } = req.session.user;
    
            let imagePath = null;
    
            // Handle image upload
            if (image && image.length > 500) {
                // Decode Base64 image
                const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, "base64");
                const fileName = `${user_code}.png`; // Use user_code as the file name
                const fullPath = path.join(UPLOAD_DIR, fileName);
    
                // Ensure the upload directory exists
                if (!fs.existsSync(UPLOAD_DIR)) {
                    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
                }
    
                // Save new image
                await fs.promises.writeFile(fullPath, buffer);
                imagePath = `/images/users/${fileName}`; // Path to save in the database
    
                // Delete the previous image if it exists
                const [userResult] = await pool.query("SELECT image FROM users WHERE user_id = ?", [userId]);
                if (userResult.length > 0 && userResult[0].image) {
                    const previousImage = path.join(UPLOAD_DIR, path.basename(userResult[0].image));
                    if (fs.existsSync(previousImage) && previousImage !== fullPath) {
                        await fs.promises.unlink(previousImage); // Delete the previous image
                    }
                }
            }
    
            // Update user information in the database
            let result;
            if(imagePath){
                [result] = await pool.query(
                    "UPDATE users SET name = ?, timezone = ?, image = ? WHERE user_id = ?",
                    [name, timezone, imagePath, userId]
                );
            }else{
                [result] = await pool.query(
                    "UPDATE users SET name = ?, timezone = ? WHERE user_id = ?",
                   [name, timezone, userId]
                );   
            } 
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found." });
            }
    
            // Update session with new information
            req.session.user.name = name;
            req.session.user.timezone = timezone;
    
            // Respond with success
            res.status(200).json({ message: "Profile updated successfully.", image: imagePath });
        } catch (error) {
            console.log("Error updating profile:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },    
    meetingHistory: async (req, res) => {
        try {
            // Check if user session exists
            if (!req.session.user || !req.session.user.id) {
                return res.status(401).json({ message: "Unauthorized. Please log in." });
            }

            // Get user ID and user_code from session
            const { id } = req.session.user;

            const [meeting_history] = await pool.query(`SELECT * FROM user_meeting_history WHERE user_id = ?`,[id]);
            
            // Respond with success
            res.status(200).json({ data : meeting_history});
        } catch (error) {
            console.log("Error getting meeting history:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    },
    meetingStats: async (req, res) => {
        try {
             // Check if user session exists
             if (!req.session.user || !req.session.user.id) {
                return res.status(401).json({ message: "Unauthorized. Please log in." });
            }

            // Get user ID and user_code from session
            const { id } = req.session.user;

            // Fetch statistics from the database
            const [results] = await pool.query(`
              SELECT
                COUNT(*) AS total_meetings,
                SUM(participants) AS total_participants,
                SUM(CAST(SUBSTRING_INDEX(meeting_duration, ' ', 1) AS UNSIGNED)) AS total_duration,
                AVG(CAST(SUBSTRING_INDEX(meeting_duration, ' ', 1) AS UNSIGNED)) AS average_duration,
                COUNT(DISTINCT user_id) AS total_users
              FROM user_meeting_history 
              WHERE user_id = ?
            `,[id]);
        
            // Optional: Statistics per user
            const [userStats] = await pool.query(`
              SELECT
                user_id,
                COUNT(*) AS meetings_count,
                SUM(CAST(SUBSTRING_INDEX(meeting_duration, ' ', 1) AS UNSIGNED)) AS total_user_duration
              FROM user_meeting_history 
              WHERE user_id = ?
              GROUP BY user_id
            `,[id]);

            res.json({
              overall: results[0],
              per_user: userStats,
            });
        } catch (error) {
            console.log("Error fetching meeting statistics:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
  
}


module.exports = usersController;


