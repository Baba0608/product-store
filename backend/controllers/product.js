const uploadToS3 = require("../utils/uploadToS3");

const ProductServices = require("../services/product");
const { get } = require("mongoose");

const addProduct = async (req, res, next) => {
  try {
    const { product, cost, brand, count, description } = req.body;
    const file = req.file;
    const fileName = file.originalname;
    const fileData = file.buffer;

    const imageURL = await uploadToS3(fileName, fileData);

    await ProductServices.addProduct(
      product,
      cost,
      brand,
      imageURL,
      count,
      description
    );

    return res
      .status(200)
      .json({ success: true, message: "Product added successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductServices.getAllProducts();
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const updateProductDetails = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const { product, cost, brand, count, description } = req.body;

    const result = await ProductServices.updateProductDetails(
      productId,
      product,
      cost,
      brand,
      count,
      description
    );

    return res
      .status(202)
      .json({ success: true, message: "Product updated successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    await ProductServices.deleteProduct(productId);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.addProduct = addProduct;
exports.getAllProducts = getAllProducts;
exports.updateProductDetails = updateProductDetails;
exports.deleteProduct = deleteProduct;
