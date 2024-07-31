const express = require('express');
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
    const products = adminData.products;
    res.render('shop', { prods: products, pageTitle: "My-Shop", path: "/", hasProds: products.length > 0, activeShop: true, productCSS: true });
});

module.exports = router;