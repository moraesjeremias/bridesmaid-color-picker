import { userService } from "../services/userService";


class UserController {

    async createAUser(request, response) {
        const { name } = request.body;
        const result = await userService.createUser(name);
        
        return response.status(201).json(result);
    }

}

export const userController = new UserController();