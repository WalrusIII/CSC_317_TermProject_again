const express = require('express');
const app = express();

// Tell Express to use EJS
app.set('view engine', 'ejs');
// Set the directory for view templates
app.set('views', './views');

app.use(express.static('public'));


const products = {
  blackBoots: {
    name: "Black Boots",
    description: "Boots that are Black",
    price: 59.99,
    image: "images/boots1.jpg"
  },
  whiteBoots: {
    name: "White Boots",
    description: "Boots that are White",
    price: 89.99,
    image: "images/boots2.jpg"
  },
  pinkGloves: {
    name: "Pink Gloves",
    description: "Gloves that are Pink",
    price: 32.99,
    image: "images/gloves1.jpg"
  },
  yellowGloves: {
    name: "Yellow Gloves",
    description: "Gloves that are Yellow",
    price: 26.99,
    image: "images/gloves2.jpg"
  },
  rainbowGoggles: {
    name: "Rainbow Goggles",
    description: "Goggles that are Rainbow",
    price: 66.99,
    image: "images/goggles1.jpg"
  },
  silverGoggles: {
    name: "Silver Goggles",
    description: "Goggles that are Silver",
    price: 99.99,
    image: "images/goggles2.jpg"
  },
  greenHelmet: {
    name: "Green Helmet",
    description: "Helmet that is Green",
    price: 120.99,
    image: "images/helmet1.jpg"
  },
  blueHelmet: {
    name: "Blue Helmet",
    description: "Helmet that is Blue",
    price: 100.99,
    image: "images/helmet2.jpg"
  },
  blueJacket: {
    name: "Blue Jacket",
    description: "Jacket that is Blue",
    price: 230.99,
    image: "images/jacket1.jpg"
  },
  yellowJacket: {
    name: "Yellow Jacket",
    description: "Jacket that is Yellow",
    price: 180.99,
    image: "images/jacket2.jpg"
  },
  orangeSnowboard: {
    name: "Orange Snowboard",
    description: "Snowboard that is Orange",
    price: 255.99,
    image: "images/snowboard1.jpg"
  },
  whiteSnowboard: {
    name: "White Snowboard",
    description: "Snowboard that is White",
    price: 319.99,
    image: "images/snowboard2.jpg"
  },
};



// set up link to each product page (in the /views folder)
app.get('/product/:key', (req, res) => {
  const key = req.params.key;
  const product = products[key];
  if (product) {
    res.render('productPage', { product, productKey: key }); // ← add productKey here
  } else {
    res.status(404).send('Product not found');
  }
});




// Routes

app.get('/', (req, res) => {
  res.render('index', { products });
});

//const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

//app.use('/users', userRoutes);
app.use('/products', productRoutes);


// SQL / Database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'data', 'database.db');
const db = new sqlite3.Database(dbPath);



// attempt at add to cart button
app.post('/add-to-cart/:key', (req, res) => {
  const productKey = req.params.key;
  const product = products[productKey];

  if (!product) {
    return res.status(404).send('Product not found');
  }

  db.get('SELECT quantity FROM cart WHERE productKey = ?', [productKey], (err, row) => {
    if (err) return res.status(500).send('DB error');

    if (row) {
      db.run(
        'UPDATE cart SET quantity = quantity + 1 WHERE productKey = ?',
        [productKey],
        (err) => {
          if (err) return res.status(500).send('Update failed');
          res.status(200).send('Updated');
        }
      );
    } else {
      db.run(
        'INSERT INTO cart (productKey, quantity, price) VALUES (?, ?, ?)',
        [productKey, 1, product.price],
        (err) => {
          if (err) return res.status(500).send('Insert failed');
          res.status(200).send('Inserted');
        }
      );
    }
  });
});

// remove from cart button
app.post('/remove-from-cart/:key', (req, res) => {
  const productKey = req.params.key;

  db.get('SELECT quantity FROM cart WHERE productKey = ?', [productKey], (err, row) => {
    if (err) return res.status(500).send('DB error');

    if (!row) {
      return res.status(404).send('Item not in cart');
    }

    if (row.quantity > 1) {
      db.run('UPDATE cart SET quantity = quantity - 1 WHERE productKey = ?', [productKey], (err) => {
        if (err) return res.status(500).send('Failed to update quantity');
        res.redirect('/cart');
      });
    } else {
      db.run('DELETE FROM cart WHERE productKey = ?', [productKey], (err) => {
        if (err) return res.status(500).send('Failed to delete item');
        res.redirect('/cart');
      });
    }
  });
});


// get info from cart database
app.get('/cart', (req, res) => {
  db.all('SELECT productKey, quantity, price FROM cart', (err, rows) => {
    if (err) return res.status(500).send('DB error');

    // You can also enrich cart items with full product info if needed
    res.render('shoppingCart', { cartItems: rows });
  });
});




/*
document.getElementById('addToCart').addEventListener('click', async () => {
  const productKey = document.getElementById('productKey').value;

  const response = await fetch(`/add-to-cart/${productKey}`, {
    method: 'POST'
  });

  if (response.ok) {
    alert('Item added to cart!');
  } else {
    const errorText = await response.text();
    alert(`Failed to add to cart: ${errorText}`);
  }
});
*/



/*
app.post('/add-to-cart/:key', (req, res) => {
  const productKey = req.params.key;

  if (!products[productKey]) {
    return res.status(404).send('Product not found');
  }

  db.get('SELECT quantity FROM cart WHERE productKey = ?', [productKey], (err, row) => {
    if (err) return res.status(500).send('DB error');

    if (row) {
      db.run('UPDATE cart SET quantity = quantity + 1 WHERE productKey = ?', [productKey], (err) => {
        if (err) return res.status(500).send('Update failed');
        res.status(200).send('Updated');
      });
    } else {
      db.run('INSERT INTO cart (productKey, quantity) VALUES (?, ?)', [productKey, 1], (err) => {
        if (err) return res.status(500).send('Insert failed');
        res.status(200).send('Inserted');
      });
    }
  });
});

*/



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



// test comment