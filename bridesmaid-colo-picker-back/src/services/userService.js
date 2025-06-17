import sequelize from "../config/dbConnection.js";
import { User } from "../models/users.js"

class UserService {


    createUser = async (name) => {
        try {
            const result = User.create({
                name: name,
            });
            return result;

        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();