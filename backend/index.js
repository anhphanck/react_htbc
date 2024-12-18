const port = 4000;
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const iwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

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
  

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
})