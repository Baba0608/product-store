const uploadToS3 = require("../utils/uploadToS3");

const ProductServices = require("../services/product");

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

    const { product, cost, brand, count, description, imageURL } = req.body;

    const result = await ProductServices.updateProductDetails(
      productId,
      product,
      cost,
      brand,
      count,
      description,
      imageURL
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

const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const result = await ProductServices.getSingleProduct(productId);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    const fileName = file.originalname;
    const fileData = file.buffer;

    const imageURL = await uploadToS3(fileName, fileData);

    return res
      .status(200)
      .json({ success: true, message: "Image uploaded.", imageURL });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

module.exports = {
  uploadImage,
  addProduct,
  getAllProducts,
  updateProductDetails,
  deleteProduct,
  getSingleProduct,
};
