import Users from './UserModel.js';
import Courses from './CourseModel.js';
import Roles from './RolesModel.js';
import Booth from './BoothModel.js';
import Cart from './CartModel.js';
import Payment from './PaymentModel.js';
import Products from './ProductsModel.js';
import Order from './OrderModel.js';
import OrderDetails from './OrderDetailsModel.js';


export const associations = () => {
    // Relasi antara Users dan Roles
    Roles.hasMany(Users, { foreignKey: 'roleId' });
    Users.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });

    // Relasi antara Users dan Courses
    Users.hasMany(Courses, { foreignKey: 'userId', as: 'courses' });
    Courses.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

    // Booth
    Users.hasOne(Booth, { foreignKey: 'userId' });
    Booth.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

    // Cart
    Cart.belongsTo(Products, { foreignKey: 'productId', as: 'product' }); // A cart references one product
    Products.hasMany(Cart, { foreignKey: 'productId', as: 'carts' }); // A product can exist in multiple carts
    Cart.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' }); // A cart belongs to a user
    Cart.hasMany(Payment, { foreignKey: 'cartId' });

    // Order
    Order.belongsTo(Cart, { foreignKey: 'cartId' });
    Order.hasMany(OrderDetails, { foreignKey: 'orderId', as: 'details', onDelete:'cascade' });
    
    // Order Details
    OrderDetails.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
    OrderDetails.belongsTo(Products, { foreignKey: 'productId', as: 'product' });
    OrderDetails.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id' });

    // Payment
    Payment.belongsTo(Cart, { foreignKey: 'cartId' });

    // Product
    Products.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
    Booth.hasMany(Products, { foreignKey: 'boothId' });
    Products.belongsTo(Booth, { foreignKey: 'boothId', as: 'booth' });
};

