const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const iwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb+srv://anhphanck17:17012003a@cluster0.lrdgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// app.get("/", (req, res) => {
//     res.send("Express App is running")
// })
mongoose.connect('mongodb://127.0.0.1:27017/my_db')
    .then(() => {
        console.log('Connected to MongoDB locally');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
//login
const JWT_SECRET = "secret"; 
const ADMIN_USERNAME = "admin"; 
const ADMIN_PASSWORD = "admin123456"; 

app.post("/login", (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username hoặc password không được để trống!",
        });
      }
  
      console.log("Received data - username:", username, "password:", password);
  
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({
          success: true,
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng!",
        });
      }
    } catch (error) {
      console.error("Error in login endpoint:", error); 
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi ở phía server!",
      });
    }
  });
  

  
//img
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (reg, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },

})

app.post('/addproduct', async(req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    } else {
        id = 1;
    }
    
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success: true,
        name:req.body.name,
    })
})

app.post('/removeproduct', async(req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({ 
        success: true,
        name:req.body.name,
    })
})

app.post('/allproducts', async (req, res) => {
    let products = await Product.find({})
        console.log("All product")
        res.send(products);

})

app.get('/products', async (req, res) => {
    const { category } = req.query;
    const products = await Product.find(category ? { category } : {});
    res.json(products);
  });
  
  app.post('/updateproduct', async (req, res) => {
    const { id, name, image, category, new_price, old_price } = req.body;
    
    const product = await Product.findOne({ id });
    if (product) {
      product.name = name;
      product.image = image;
      product.category = category;
      product.new_price = new_price;
      product.old_price = old_price;
  
      await product.save();
      res.json({
        success: true,
        message: "Sản phẩm đã được cập nhật.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sản phẩm không tìm thấy.",
      });
    }
  });
  
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
})