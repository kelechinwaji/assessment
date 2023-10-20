const Product = require("../schema/product");

async function createProduct(name, description, price, quantity) {
  try {
    const product = new Product({
      name,
      description,
      price,
      quantity,
    });

    await product.save();
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getProducts(page, limit) {
    try {
      const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
  
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  module.exports = {
    createProduct,
    getProducts,
  };
  