import { TOrder } from "../order/order.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserInDB = async (userData: TUser) => {
    const result = UserModel.create(userData)
    return result

}

const getAllUserDB = async () => {
    const result = UserModel.aggregate([
        { $match: {} },
        {
            $project: { userId: 1, username: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return result
}
const getSingleUserDB = async (id: string) => {
    const result = UserModel.findOne({ userId: id })
    return result
}
const updateUserDB = async (id: string, data: TUser) => {
    const result = UserModel.updateOne({ userId: id }, { $set: data })
    return result
}
const deleteUserDB = async (id: string) => {
    const result = UserModel.deleteOne({ userId: id })
    return result
}
const addOrderDB = async (id: string, orderData: TOrder) => {
    const data = new UserModel(orderData)
    if (await data.isUserExits(id)) {
        // const u = await UserModel.aggregate([
        //     { $match: { userId: parseInt(id) } },

        //     // { $addFields: { orders: [orderData] } }
        //     // {
        //     //     $match: {}
        //     // }
        // ])
        const u = await data.isUserExits(id)
        console.log(u)
        const updatedUser = await UserModel.findByIdAndUpdate(
            { userId: parseInt(id) },
            { $set: { ...u, orders: orderData } },
            { new: true }
        );
        return updatedUser
        // const dp = await UserModel.updateOne({ userId: parseInt(id) }, u[0])
        // console.log('dp', dp)
        // console.log(u[0])
        // throw new Error('User is exits')
    }
    else {
        console.log('not exist')
        throw new Error('User is not  exits')
    }
}

export const userServices = {
    createUserInDB,
    getAllUserDB,
    getSingleUserDB,
    updateUserDB,
    deleteUserDB,
    addOrderDB
}