const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors"); 
const morgan = require('morgan')
const {connectDB} = require('./utils/configDB')
const multer = require("multer");
const path = require("path");
const app = express();


// configuration
dotenv.config({});
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    }, 
      filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/:/g, '-');
        const originalname = path.parse(file.originalname).name; 
        const extension = path.extname(file.originalname); 
        const filename = `${date}_${originalname}${extension}`; 
        cb(null, filename);
      },
  });
  
  const upload = multer({
    storage: storage
  });
  app.post("/api/v1/upload", upload.single("file"), (req, res) => {
    console.log('okay');
    try {
      const fileName = req.file.filename;  
      return res.status(200).send({ success: true,message: "File uploaded successfully", fileName });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({ error: 'Something went wrong' });
    }
  });
 
app.use('/api/v1/user' ,require('./routes/userRoute'));
app.use('/api/v1/category' ,require('./routes/categoryRoute'));
app.use('/api/v1/product' ,require('./routes/productRoute')) ;


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is live on port ${port}`);
})