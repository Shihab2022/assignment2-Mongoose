import { Request, Response } from "express";
import { userServices } from "./user.service";
import { validationSchema } from "./validation.schema";

const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const zodData = validationSchema.parse(data)
        const result = await userServices.createUserInDB(zodData)
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: result
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserDB()
        res.status(201).json({
            success: true,
            message: "Get all user successfully!",
            data: result
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.getSingleUserDB(userId)
        res.status(201).json({
            success: true,
            message: "Get single user successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        const result = await userServices.updateUserDB(userId, data)
        res.status(201).json({
            success: true,
            message: "Update user successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.deleteUserDB(userId)
        res.status(201).json({
            success: true,
            message: "Delete user successfully!",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const addOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        const user = await userServices.addOrderDB(userId, data);

        res.status(201).json({
            success: true,
            message: "Get single user successfully!",
            data: user,
            // id: userId
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const order = await userServices.getSingleOrderDB(userId);
        // console.log(order[0].orders)
        res.status(201).json({
            success: true,
            message: "Order fetched successfully!",
            data: { orders: order[0].orders },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

const getTotalCost = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const cost = await userServices.getTotalCostDB(userId);
        res.status(201).json({
            success: true,
            message: "Total price calculated successfully!",
            data: { totalPrice: cost[0].totalCost },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}
export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getSingleOrder,
    getTotalCost
}