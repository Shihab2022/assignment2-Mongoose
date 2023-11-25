import { Request, Response } from "express";
import { userServices } from "./user.service";
import { validationSchema } from "./validation.schema";
import { customErrorMessage, customSuccessMessage } from "./message";

const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const zodData = validationSchema.parse(data)
        const result = await userServices.createUserInDB(zodData)
        res.status(201).json(customSuccessMessage("User created successfully!", result))
    }
    catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserDB()
        res.status(200).json(customSuccessMessage("Users fetched successfully!", result))
    }
    catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.getSingleUserDB(userId)
        res.status(200).json(customSuccessMessage("User fetched successfully!", result))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        const result = await userServices.updateUserDB(userId, data)
        res.status(200).json(customSuccessMessage("User updated successfully!", result))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.deleteUserDB(userId)
        res.status(201).json(customSuccessMessage("User deleted successfully!", result.acknowledged ? null : result))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const addOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const data = req.body
        const user = await userServices.addOrderDB(userId, data);

        res.status(200).json(customSuccessMessage("Order created successfully!", null))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const order = await userServices.getSingleOrderDB(userId);
        res.status(200).json(customSuccessMessage("Order fetched successfully!", { orders: order[0].orders }))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
    }
}

const getTotalCost = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const cost = await userServices.getTotalCostDB(userId);
        res.status(200).json(customSuccessMessage("Total price calculated successfully!", { totalPrice: cost[0].totalCost }))
    } catch (error: any) {
        res.status(500).json(customErrorMessage(error))
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