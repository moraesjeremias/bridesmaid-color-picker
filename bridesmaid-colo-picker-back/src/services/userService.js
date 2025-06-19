import sequelize from "../config/dbConnection.js";
import { User } from "../models/users.js"
import UserException from "../models/exceptions/userException.js";

class UserService {

    getUser = async (id) => {
        try {
            const result = await User.findByPk(id);
            return result;
        } catch (error) {
            throw new UserException("Cannot get the user because: " + error, 500);
        }
    }

    createUser = async (name, id) => {
        try {
            const result = User.create({
                name: name,
                id: id,
            });
            return result;

        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();