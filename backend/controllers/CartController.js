import Cart from "../models/CartModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";

// Get all carts
export const getCarts = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            include: [{
                model: Products,
                as: 'product',
                attributes1: ['name'],
                attributes2: ['price']
            }]
        }); 
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get cart by ID
export const getCartByUserId = async (req, res) => {
    try {
        // Get userId from params
        const { userId } = req.params;
        console.log('User ID:', userId);

        // Validate userId
        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId parameter' });
        }

        // Fetch all cart items for the user and include product details
        const carts = await Cart.findAll({
            where: { userId }, // filter by userId
            include: [
                {
                    model: Products,
                    as: 'product',
                    attributes: ['id','name', 'price'],
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'name', 'uuid'], // Include user details (if needed)
                },
            ],
        });

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No cart items found for this user' });
        }

        // Return the cart items
        return res.status(200).json({
            carts, // returns cart items with products details
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Create new cart
export const createCart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;
        if (!productId || !quantity || !userId) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        const newCart = await Cart.create({ productId, quantity,userId });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const calculateSubTotal = async (req, res) => {
    const { userId } = req.params;
    try {
      // Fetching cart items for a specific user along with product details
      const carts = await Cart.findAll({
        where: { userId },
        include: [{ model: Products,as:'product', attributes: ['price', 'name'] }],
      });
  
    //   Logging the carts to check the data structure
      console.log('Fetched carts:', carts);
  
      // Check if cartItems is empty
      if (!carts || carts.length === 0) {
        return res.status(404).json({ message: 'No items in cart' });
      }
  
      // Calculate the total price
      const subTotal = carts.reduce((sum, item) => {
        // Default to 0 if quantity is null or undefined
        const quantity = item.quantity || 0;
  
        // Check if product exists and access its price
        const price = item.product ? item.product.price : 0;

        const name = item.product ? item.product.name : 'Unknown';
  
        // Log for debugging purposes
        console.log(`Item: ${name}, Quantity: ${quantity}, Price: ${price}`);
  
        // Calculate the total price
        return sum + (quantity * price);
      }, 0); // Initial value of the sum is 0
  
      // Log the calculated total price
      console.log(`Calculated Total Price: ${subTotal}`);
  
      // Return the total price in the response
      return res.status(200).json({ subTotal });
  
    } catch (error) {
      // Catch any errors and log them
      console.error('Error calculating total price:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  

  

// Update existing cart
export const updateCart = async (req, res) => { 
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        
        const {quantity, productDescription } = req.body;
        await cart.update({quantity, productDescription });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete cart
export const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        
        await cart.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all carts
export const deleteAllCarts = async (req, res) => {
    try {
        const result = await Cart.destroy({ where: {} }); // Deletes all records
        if (result === 0) {
            return res.status(404).json({ message: "No carts found to delete" });
        }
        res.status(200).json({ message: `${result} cart(s) deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};