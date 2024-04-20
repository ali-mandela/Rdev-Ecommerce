const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY)

const addProductController = async (req, res) => {
    console.log(req.body);
    try {
        console.log('okay');
        const { name, image, price, category, description } = req.body;

        const newProduct = new productModel({ name, image, price, category, description });

        await newProduct.save();

        return res.status(201).send({ message: "Product added successfully", success: true, data: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error", success: false });
    }
};


const editProductController = async(req, res) => {
    try {
        const productId = req.params.id;
        const {name, image, price, category, description} = req.body;

        if (!productId) {
            return res
                .status(400)
                .send({message: "Product ID is required", success: false});
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res
                .status(404)
                .send({message: "Product not found", success: false});
        }

        if (name) 
            product.name = name;
        if (image) 
            product.image = image;
        if (price) 
            product.price = price;
        if (category) 
            product.category = category;
        if (description) 
            product.description = description;
        
        await product.save();

        return res
            .status(200)
            .send({message: "Product updated successfully", success: true, data: product});
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({message: "Internal server error", success: false});
    }
};

const deleteProductController = async(req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res
                .status(400)
                .send({message: "Product ID is required", success: false});
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res
                .status(404)
                .send({message: "Product not found", success: false});
        }

        return res
            .status(200)
            .send({message: "Product deleted successfully", success: true, data: deletedProduct});
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({message: "Internal server error", success: false});
    }
};

const getSingleProductController = async(req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res
                .status(400)
                .send({message: "Product ID is required", success: false});
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res
                .status(404)
                .send({message: "Product not found", success: false});
        }

        return res
            .status(200)
            .send({message: "Product retrieved successfully", success: true, data: product});
    } catch (error) {
        console.error(error.message);
        return res
            .status(500)
            .send({message: "Internal server error", success: false});
    }
};

const getAllProductsController = async(req, res) => {
    try {
        const products = await productModel.find();

        if (!products || products.length === 0) {
            return res
                .status(404)
                .send({message: "No products found", success: false});
        }

        return res
            .status(200)
            .send({message: "Products retrieved successfully", success: true, data: products});
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({message: "Internal server error", success: false});
    }
};

 
const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
   
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.status(404).send({ message: 'Order not found', success: false });
      }
   
      await orderModel.findByIdAndDelete(orderId); 
  
      res.status(200).send({ message: 'Order deleted successfully', success: true });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).send({ message: 'Failed to delete order', success: false });
    }
};
  

const payLaterController = async (req, res) => {
    try {
      const { user, items,  totalAmount, status,address } = req.body; 
  
      const newPayment = new orderModel({
        user,
        items:items, 
        totalAmount,
        status,
        address
      });
   
      await newPayment.save();
  
      res.status(200).send({ message: 'Order placed successfully!', success: true });
    } catch (error) {
      console.error('Error in order placed:', error);
      res.status(500).send({ message: 'Internal server error', success: false });
    }
  };
  
  const payNowController = async (req, res) => {
    const { user, items, totalAmount, status, address } = req.body;
  
    try {
      // Create a new payment
      const newPayment = new orderModel({
        user,
        items,
        totalAmount,
        status,
        address
      });
  
      // Create line items for the Stripe session
      const lineItems = items.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.item.name,
            description: product.item.description, 
          },
          unit_amount: product.item.price * 100, // Convert to cents
        },
        quantity: product.quantity,
      }));
  
      // Create a Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Array of accepted payment methods
        line_items: lineItems,
        mode: "payment",
        success_url: "https://r-store-liard.vercel.app/success",
        cancel_url: "https://r-store-liard.vercel.app/cancel",
      });
  
      if (session.id) {
        newPayment.payment = true;
        const savedPayment = await newPayment.save();
  
        return res.status(200).send({
          message: "Payment session created successfully",
          success: true,
          data: savedPayment,
          sessionId: session.id
        });
      } else {
        return res.status(200).send({
          message: "Payment session creation failed",
          success: false
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).send({
        message: "Failed to process payment",
        success: false
      });
    }
  };
  
  
 const getAllMyOrders = async (req, res) => { 
    try {
      const userId = req.body.userId;
      console.log(userId);
         const orders = await orderModel.find({ user: userId }).populate('user', 'name email');
        if (!orders) {
        return res.status(404).send({ message: 'No orders found for the user', success: false });
      }
        res.status(200).send({ orders, success: true });
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      return res.status(500).send({ message: 'Internal server error', success: false });
    }
  };
 
   
const getAllOrders = async (req, res) => { 
    try {  
         const orders = await orderModel.find().populate('user', 'name email');;
        if (!orders) {
        return res.status(404).send({ message: 'No orders found', success: false });
      }
        res.status(200).send({ orders, success: true });
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      return res.status(500).send({ message: 'Internal server error', success: false });
    }
  };

  
  const updateOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
  
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res.status(404).send({ message: 'Order not found', success: false });
      }
   
      order.status = 'Delivered';
      order.payment = true;
      await order.save();
  
      res.status(200).send({ message: 'Order status updated successfully', success: true });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).send({ message: 'Failed to update order status', success: false });
    }
  };
  
module.exports = {
    addProductController,
    deleteProductController,
    editProductController,
    getSingleProductController,
    getAllProductsController,
    payLaterController,
    payNowController,
    getAllMyOrders,
    deleteOrder,
    getAllOrders,updateOrder
}