const { httpServer, app } = require("./socket")
const path = require("path")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});  

const PORT = process.env.PORT || 3005;
httpServer.listen(PORT,()=>{
    console.log(`Socket is running on port : ${PORT}`);
    console.log(`Access origin : [${process.env.CLIENT_URL}, ${process.env.CLIENT_URL_1}, ${process.env.CLIENT_URL_2}]`)
});