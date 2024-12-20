import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import path from 'path'

import UserRoute from "./routes/UserRoute.js";
import CartRoute from "./routes/CartRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import OrderDetailsRoute from "./routes/OrderDetailsRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BoothRoute from "./routes/BoothRoute.js";
import CourseRoute from "./routes/CourseRoute.js";

import { associations } from './models/Association.js';

dotenv.config();
// console.log(process.env)


const app = express();

associations();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
})

// (async()=>{
//     await db.sync();
// })();

/* The commented out code `app.use(session({ ... }))` is setting up a session middleware in the Express application. Here's what each option in the session configuration object does: */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(CartRoute);

app.use(OrderRoute);
app.use(OrderDetailsRoute);
app.use(PaymentRoute);
app.use(RoleRoute);
app.use(AuthRoute);
app.use(BoothRoute);
app.use(CourseRoute);





store.sync(); 



console.log('Session Secret:', process.env.SESSION_SECRET);


app.listen(process.env.APP_PORT,()=>{
    console.log('Server is running...');
});