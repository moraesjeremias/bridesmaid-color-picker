import { Router } from "express"; 
import { colorsController } from "./controllers/colorsController.js";

const routes = Router();

routes.get("/colors", colorsController.getColors);
routes.post("/colors", colorsController.chooseColor);


export  {routes};