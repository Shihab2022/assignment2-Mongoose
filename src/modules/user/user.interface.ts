import { Model } from "mongoose"
import { TOrder } from "../order/order.interface"



export type TUser = {
    userId: number,
    username: string,
    password: string,
    fullName: {
        firstName: string,
        lastName: string
    },
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: {
        street: string,
        city: string,
        country: string
    }
    orders?: TOrder[]
}


export interface UserMethods extends Model<TUser> {
    isUserExistsStatic(userId: any): Promise<TUser | null>
}
