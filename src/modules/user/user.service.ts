import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserInDB = async (userData: TUser) => {
    const result = UserModel.create(userData)
    return result

}

const getAllUserDB = async () => {
    const result = UserModel.find()
    return result
}
export const userServices = {
    createUserInDB,
    getAllUserDB
}