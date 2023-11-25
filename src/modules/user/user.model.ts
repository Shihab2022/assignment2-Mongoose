import mongoose, { Schema } from "mongoose";
import { TUser, UserInterfaceModel, UserMethods } from "./user.interface";
import { orderSchema } from "../order/order.model";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser, UserInterfaceModel, UserMethods>({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    isActive: { type: Boolean, required: [true, 'Active status is required'] },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
        },
        city: { type: String, required: [true, 'City is required'] },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
    },
    orders: {
        type: [orderSchema],
    }
});

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = ''
    next()
})

//---> Creating a custom instance method 
userSchema.methods.isUserExits = async function (id: string) {
    const existingUser = await UserModel.findOne({ userId: id })

    return existingUser
}
export const UserModel = mongoose.model<TUser, UserInterfaceModel>('User', userSchema);