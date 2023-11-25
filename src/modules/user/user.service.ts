import { TOrder } from "../order/order.interface";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserInDB = async (userData: TUser) => {
    if (await UserModel.isUserExistsStatic(userData.userId)) {
        throw new Error("User already exits ")
    }
    const result = await UserModel.create(userData)
    const userWithoutPassword: TUser = result.toObject();
    const { password, orders, ...newData } = userWithoutPassword
    return newData

}

const getAllUserDB = async () => {
    const result = UserModel.aggregate([
        { $match: {} },
        {
            $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return result
}
const getSingleUserDB = async (id: string) => {
    if (await UserModel.isUserExistsStatic(id)) {
        const result = UserModel.aggregate([
            { $match: { userId: parseFloat(id) } },
            { $project: { userId: 1, username: 1, fullName: 1, age: 1, email: 1, isActive: 1, hobbies: 1, address: 1 } }
        ])
        return result
    }
    else {
        throw new Error("User not found ")
    }
}
const updateUserDB = async (id: string, data: TUser) => {
    if (await UserModel.isUserExistsStatic(id)) {
        const result = UserModel.findOneAndUpdate(
            { userId: id },
            {
                $set: data,
            },
            { new: true, useFindAndModify: false, select: 'userId username fullName age email isActive hobbies address' }
        )
        return result
    }
    else {
        throw new Error("User not found ")
    }

}
const deleteUserDB = async (id: string) => {
    if (await UserModel.isUserExistsStatic(id)) {
        const result = UserModel.deleteOne({ userId: id })
        return result
    }
    else {
        throw new Error("User not found ")
    }

}
const addOrderDB = async (id: string, orderData: TOrder) => {
    if (await UserModel.isUserExistsStatic(id)) {
        if (!orderData.productName || !orderData.price || !orderData.quantity) {
            throw new Error("Please put order data correctly !")
        }
        const result = UserModel.findOneAndUpdate(
            { userId: id },
            {
                $push: {
                    orders: orderData,
                },
            },
        )
        return result
    }
    else {
        throw new Error("User not found ")
    }
}
const getSingleOrderDB = async (id: string) => {
    if (await UserModel.isUserExistsStatic(id)) {
        const result = UserModel.aggregate([
            { $match: { userId: parseInt(id) } },
            {
                $project: { orders: 1 }
            }
        ])
        return result
    }
    else {
        throw new Error("User not found ")
    }

}
const getTotalCostDB = async (id: string) => {

    if (await UserModel.isUserExistsStatic(id)) {
        const result = UserModel.aggregate([
            { $match: { userId: parseInt(id) } },
            {
                $unwind: "$orders"
            },
            {
                $project: {
                    totalCost: { $multiply: ["$orders.price", "$orders.quantity"] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: "$totalCost" }
                }
            }
        ])
        return result
    }
    else {
        throw new Error("User not found ")
    }


}
export const userServices = {
    createUserInDB,
    getAllUserDB,
    getSingleUserDB,
    updateUserDB,
    deleteUserDB,
    addOrderDB,
    getSingleOrderDB,
    getTotalCostDB
}