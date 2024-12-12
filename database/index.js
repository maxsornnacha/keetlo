const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME,                       
    password: process.env.DB_PASSWORD,           
    database: process.env.DB_DATABASE,               
    port: process.env.DB_PORT,                      
});

// Check if the connection pool is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error connecting to the database:', err);
        return; // Exit early if there's an error
    } 
    console.log('Connected to the database successfully!!');
    connection.release(); // Release the connection
});

// Export the connection pool directly
module.exports = pool.promise();
