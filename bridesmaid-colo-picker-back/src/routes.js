import { Router } from "express"; 
import { colorsController } from "./controllers/colorsController.js";
const routes = Router();


routes.get("/colors", colorsController.avaiableColors);


export  {routes};