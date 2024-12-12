const pool = require("../database/index");

const imagesController = {
   index: async (req, res) => {
      const [response] = await pool.query("SELECT * FROM images")
        res.json({data: response})
   },
   uploadImage: async (req, res) => {
      if (req.file == undefined) {
         return res.status(400).send('Error: No file selected!');
      }
   
      // Assuming your images table has a column named 'image_path'
      const imagePath = `/images/${req.file.filename}`; // Adjust path based on your structure
   
      // Save the image path to the database
      const query = 'INSERT INTO images (image) VALUES (?)';
      const [result] = await pool.query(query, [imagePath]);

      if(result.affectedRows > 0){
         res.json("อัพโหลดสำเร็จ")
      }
      else{
         res.status(500).json("อัพโหลดรูปภาพไม่สำเร็จ")
      }
   }
}


module.exports = imagesController;


