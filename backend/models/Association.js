import Users from './UserModel.js';
import Courses from './CourseModel.js';
import Roles from './RolesModel.js';
import Booth from './BoothModel.js';
import Cart from './CartModel.js';
import Order from './OrderModel.js';
import Payment from './PaymentModel.js';
import Products from './ProductsModel.js';


export const associations = () => {
    // Relasi antara Users dan Roles
    Roles.hasMany(Users, { foreignKey: 'roleId' });
    Users.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });

    // Relasi antara Users dan Courses
    Users.hasMany(Courses, { foreignKey: 'userId', as: 'courses' });
    Courses.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

    // Booth
    Users.hasOne(Booth, { foreignKey: 'userId' });
    Booth.belongsTo(Users, { foreignKey: 'userId' });

    //Cart
    Cart.hasMany(Products);
    Cart.belongsTo(Products, { foreignKey: 'productId', targetKey: 'id'  });
    Cart.belongsTo(Users, { foreignKey: 'userId', targetKey: 'id'  });

    //Order
    Order.belongsTo(Cart, { foreignKey: 'cartId' });

    //Payment
    Payment.belongsTo(Order, { foreignKey: 'orderId' });

    //Product
    Products.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

    Booth.hasMany(Products, { foreignKey: 'boothId'}); // Sesuaikan jika Booth menggunakan uuid sebagai primary key
    Products.belongsTo(Booth, { foreignKey: 'boothId', as: 'booth'});
};
