const dbConn = require('../middlewares/db.connection');

module.exports = {
  createCategory: (req, res) => {
    if (req.body.category_name) {
      dbConn.query(
        'SELECT * FROM category WHERE category_name=?',
        req.body.category_name,
        (err, getRes) => {
          if (err) res.status(500).send(err);
          if (getRes.length > 0) {
            res.status(400).send('Category already exists');
          } else {
            dbConn.query(
              'INSERT INTO category SET ?',
              { category_name: req.body.category_name },
              (err, result) => {
                if (err) res.status(500).send(err);
                console.log(result);
                res.status(200).send('Category added successfully');
              }
            );
          }
        }
      );
    } else {
      res.status(400).send('Required params are missing');
    }
  },
  getCategories: (req, res) => {
    dbConn.query('SELECT * FROM category', (err, result) => {
      if (err) res.status(500).send('Something went wrong');
      res.status(200).send(result);
    });
  },
  createSubCategory: (req, res) => {
    if (req.body.name && req.body.category_name) {
      dbConn.query(
        'INSERT INTO sub_category SET ?',
        { category_name: req.body.category_name, name: req.body.name },
        (err, result) => {
          if (err) res.status(500).send('Something went wrong');
          console.log(result);
          res.status(200).send('Sub category added successfully');
        }
      );
    } else {
      res.status(400).send('Required params are missing');
    }
  },
  getSubCategories: (req, res) => {
    dbConn.query('SELECT * FROM sub_category', (err, result) => {
      if (err) res.status(500).send('Something went wrong');
      res.status(200).send(result);
    });
  },
};
