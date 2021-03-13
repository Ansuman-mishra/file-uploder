const express = require("express");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

dotenv.config({ path: "./config.env" });

// const host = process.env.LOCAL_HOST;
const port = process.env.PORT;

app.use(fileUpload());

//upload endpoint
app.post("/upload", (req, res) => {
   if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
   }
   const file = req.files.file;
   file.mv(
      path.join(__dirname, `/client/public/uploads/${file.name}`),
      (err) => {
         if (err) {
            console.error(err);
            return res.status(500).send(err);
         }
         res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      }
   );
});

app.listen(port, () => {
   console.log(`connected to port 5000`);
});
