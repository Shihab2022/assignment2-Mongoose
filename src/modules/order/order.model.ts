import { Schema } from "mongoose";
import { TOrder } from "./order.interface";


export const orderSchema = new Schema<TOrder>({


    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price  is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    }
});