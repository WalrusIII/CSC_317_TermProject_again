const express = require('express');
const router = express.Router();

/*
const products = [
  { id: 1, name: 'Black Boots' },
  { id: 2, name: 'White Boots' },
  { id: 3, name: 'Pink Gloves' },
  { id: 4, name: 'Yellow Gloves' },
  { id: 5, name: 'Rainbow Goggles' },
  { id: 6, name: 'Silver Goggles' },
  { id: 7, name: 'Green Helmet' },
  { id: 8, name: 'Blue Helmet' },
  { id: 9, name: 'Blue Jacket' },
  { id: 10, name: 'Yellow Jacket' },
  { id: 11, name: 'Orange Snowboard' },
  { id: 12, name: 'White Snowboard' }
];

const price = {
  1: 59.99,
  2: 89.99,
  3: 32.99,
  4: 26.99,
  5: 66.99,
  6: 99.99,
  7: 120.99,
  8: 100.99,
  9: 230.99,
  10: 180.99,
  11: 255.99,
  12: 319.99
};
*/

const products = [
    {
        id: 1,
        name: "Black Boots",
        description: "Boots that are Black",
        price: 59.99,
        image: "images/boots1.jpg"
    },
    {
        id: 2,
        name: "White Boots",
        description: "Boots that are White",
        price: 89.99,
        image: "images/boots2.jpg"
    },
    {
        id: 3,
        name: "Pink Gloves",
        description: "Gloves that are Pink",
        price: 32.99,
        image: "images/gloves1.jpg"
    },
    {
        id: 4,
        name: "Yellow Gloves",
        description: "Gloves that are Yellow",
        price: 26.99,
        image: "images/gloves2.jpg"
    },
    {
        id: 5,
        name: "Rainbow Goggles",
        description: "Goggles that are Rainbow",
        price: 66.99,
        image: "images/goggles1.jpg"
    },
    {
        id: 6,
        name: "Silver Goggles",
        description: "Goggles that are Silver",
        price: 99.99,
        image: "images/goggles2.jpg"
    },
    {
        id: 7,
        name: "Green Helmet",
        description: "Helmet that is Green",
        price: 120.99,
        image: "images/helmet1.jpg"
    },
    {
        id: 8,
        name: "Blue Helmet",
        description: "Helmet that is Blue",
        price: 100.99,
        image: "images/helmet2.jpg"
    },
    {
        id: 9,
        name: "Blue Jacket",
        description: "Jacket that is Blue",
        price: 230.99,
        image: "images/jacket1.jpg"
    },
    {
        id: 10,
        name: "Yellow Jacket",
        description: "Jacket that is Yellow",
        price: 180.99,
        image: "images/jacket2.jpg"
    },
    {
        id: 11,
        name: "Orange Snowboard",
        description: "Snowboard that is Orange",
        price: 255.99,
        image: "images/snowboard1.jpg"
    },
    {
        id: 12,
        name: "White Snowboard",
        description: "Snowboard that is White",
        price: 319.99,
        image: "images/snowboard2.jpg"
    }

];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:productId', (req, res) => {
  const product = products.find(p => p.id == req.params.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
/*
router.get('/:productId/price', (req, res) => {
  const productId = req.params.productId;
  const productPrices = price[productId];
  if (productPrices) {
    res.json(productPrices);
  } else {
    res.status(404).json({ error: 'Price not found for product' });
  }
});
*/

module.exports = router;