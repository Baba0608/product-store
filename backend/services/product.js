const Product = require("../models/product");

const addProduct = (name, cost, brand, imageURL, count, description) => {
  return Product.create({
    productName: name,
    cost: cost,
    available: count != 0,
    count: count,
    imageURL: imageURL,
    brand: brand,
    description: description,
  });
};

const getAllProducts = () => {
  return Product.find();
};

const updateProductDetails = (
  productId,
  name,
  cost,
  brand,
  count,
  description
) => {
  return Product.updateOne(
    { _id: productId },
    {
      productName: name,
      cost: cost,
      available: count != 0,
      count: count,
      brand: brand,
      description: description,
    }
  );
};

const deleteProduct = (productId) => {
  return Product.findByIdAndDelete({ _id: productId });
};

exports.addProduct = addProduct;
exports.getAllProducts = getAllProducts;
exports.updateProductDetails = updateProductDetails;
exports.deleteProduct = deleteProduct;
