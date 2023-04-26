var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');
const {
  createProuct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require('../controllers/product-controller');
const {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategories,
} = require('../controllers/category-controller');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(null, Date.now() + uniqid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Product routes
router.post('/create-product', upload.array('images', 5), createProuct);
router.put('/update-product/:id', upload.array('images', 5), updateProduct);
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.delete('/product/:id', deleteProduct);

// Categroy routes
router.post('/create-category', createCategory);
router.get('/categories', getCategories);
router.post('/create-sub-category', createSubCategory);
router.get('/sub-categories', getSubCategories);

module.exports = router;
