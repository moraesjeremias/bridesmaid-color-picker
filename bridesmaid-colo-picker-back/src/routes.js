import { Router } from "express"; 
import { colorsController } from "./controllers/colorsController.js";
import { userController } from "./controllers/usersController.js";
import { statusController } from "./controllers/statusController.js";

const routes = Router();

routes.get("/colors", colorsController.getColors);
routes.post("/colors", colorsController.chooseColor);
routes.get("/users/:id", userController.getUser);
routes.post("/users", userController.createUser);
routes.get("/status", statusController.getStatus);

export  {routes};
