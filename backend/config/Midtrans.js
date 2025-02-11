import Midtrans from "midtrans-client";
import dotenv from 'dotenv'

dotenv.config();
console.log('Initializing Midtrans with:');
console.log('Server Key exists:', !!process.env.SECRET);
console.log('Client Key exists:', !!process.env.NEXT_PUBLIC_CLIENT);

export const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
});