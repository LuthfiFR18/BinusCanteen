import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import db from "./config/Database.js";
import CartRoute from "./routes/CartRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";


dotenv.config();

const app = express();

(async()=>{
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(UserRoute);
app.use(ProductRoute);
// app.use(SellerRoute);
app.use(OrderRoute);
app.use(CartRoute);
app.use(PaymentRoute);


app.listen(process.env.APP_PORT,()=>{
    console.log('Server is running...');
});