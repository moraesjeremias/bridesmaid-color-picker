import { Router } from "express"; 
import { colorsController } from "./controllers/colorsController.js";
import { userController } from "./controllers/usersController.js";

const routes = Router();

routes.get("/colors", colorsController.getColors);
routes.post("/colors", colorsController.chooseColor);
routes.get("/users/:id", userController.getUser);
routes.post("/users", userController.createUser);

export  {routes};