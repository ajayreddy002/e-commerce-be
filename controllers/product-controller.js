const fs = require('fs');
const dbConn = require('../middlewares/db.connection');
module.exports = {
  createProuct: (req, res) => {
    if (
      req.body.name &&
      req.body.price &&
      req.body.category &&
      req.body.sub_category &&
      req.files
    ) {
      const files = req.files.map((file) => {
        console.log(file);
        return `images/${file.filename}`;
      });
      const record = { ...req.body, images: JSON.stringify(files) };
      dbConn.query('INSERT INTO products SET ?', record, (err, result) => {
        if (err) res.status(500).send(err);
        if (result && result.insertId) {
          res.status(200).send({ message: 'Product added successfully' });
        }
      });
    } else {
      res.status(400).send('Required params are missing');
    }
  },
  getProducts: (req, res) => {
    dbConn.query('SELECT * FROM products', (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  getProductById: (req, res) => {
    if (req.params.id) {
      dbConn.query(
        'SELECT * FROM products WHERE id=?',
        [req.params.id],
        (err, result) => {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        }
      );
    } else {
      res.status(400).send('Required params are missing');
    }
  },
  updateProduct: (req, res) => {
    if (
      req.body.name &&
      req.body.price &&
      req.body.category &&
      req.body.sub_category &&
      req.params.id
    ) {
      const files = req.files.map((file) => {
        console.log(file);
        return `images/${file.filename}`;
      });
      let record;
      if (files.length > 0) {
        record = { ...req.body, images: JSON.stringify(files) };
      } else {
        record = { ...req.body };
      }
      dbConn.query(
        'UPDATE products SET? WHERE id=? ',
        [record, req.params.id],
        (err, result) => {
          if (err) res.status(500).send(err);
          console.log(result);
          if (result && result.affectedRows > 0) {
            res.status(200).send('Product updated successfully');
          }
        }
      );
    }
  },
  deleteProduct: (req, res) => {
    if (req.params.id) {
      dbConn.query(
        'DELETE FROM products WHERE id=?',
        [req.params.id],
        (err, deleteRes) => {
          if (err) res.status(500).send(err);
          if (deleteRes && deleteRes.affectedRows > 0) {
            res.status(200).send(deleteRes);
          }
        }
      );
    } else {
      res.status(400).send('Required params are missing');
    }
  },
};
