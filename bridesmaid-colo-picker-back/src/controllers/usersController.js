import { userService } from "../services/userService.js";


class UserController {

    async getUser(request, response) {
        try {
            const { id } = request.params;
            const result = await userService.getUser(id);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(error.status).json({ message: error.message });
        }
    }

    async createUser(request, response) {
        const { name, id } = request.body;
        const result = await userService.createUser(name, id);
        
        return response.status(201).json(result);
    }

}

export const userController = new UserController();