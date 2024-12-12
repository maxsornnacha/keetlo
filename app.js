const express = require("express")
const { configureMiddleware } = require("./middlewares/middlewares"); // Adjust the path as necessary
const app = express();
const path = require("path")
require('dotenv').config();
configureMiddleware(app);

//import routers
const imagesRouter = require("./routes/images.router");
const usersRouter = require("./routes/users.router");
const meetingsRouter = require("./routes/meeting.router");
const hooksRouter = require("./routes/hooks.router");

//use routers
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/meetings", meetingsRouter);
app.use("/api/hooks", hooksRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});  

// Start the server
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Access origin : [${process.env.CLIENT_URL}, ${process.env.CLIENT_URL_1}, ${process.env.CLIENT_URL_2}]`)
});

