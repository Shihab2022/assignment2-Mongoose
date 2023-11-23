import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const result = await userServices.createUserInDB(data)
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

export const userController = {
    createUser,
    getAllUser
}