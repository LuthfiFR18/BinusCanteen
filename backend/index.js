import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";


import UserRoute from "./routes/UserRoute.js";
import CartRoute from "./routes/CartRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BoothRoute from "./routes/BoothRoute.js";
import CourseRoute from "./routes/CourseRoute.js";

import { associations } from './models/Association.js';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { MenuProvider } from "../src/app/MenuContext.js";

ReactDOM.render(
    <MenuProvider>
        <App />
    </MenuProvider>,
    document.getElementById("root")
);

dotenv.config();
console.log(process.env)


const app = express();

associations();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
})

// (async()=>{
//     await db.sync();
// })();

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

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(OrderRoute);
app.use(CartRoute);
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