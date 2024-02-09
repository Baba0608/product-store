const CartServices = require("../services/cart");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { _id: userId } = req.user;

    const product = await CartServices.addToCart(userId, productId, quantity);

    return res
      .status(202)
      .json({ success: true, message: "Product Added to cart" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const deleteFromCart = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { _id: userId } = req.user;

    const result = await CartServices.deleteFromCart(userId, productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted from cart." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

module.exports = { addToCart, deleteFromCart };
