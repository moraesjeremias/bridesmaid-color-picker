import { colorService } from "../services/colorsService.js";

class ColorsController {

  async avaiableColors(request, response) {
    try {
      const result = await colorService.getAvaibleColors();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(error.status || 500).json(error.message);
    }
  }

  async choseColor(request, response) {

  }

  async checkStatusColor(request, response) {

  }
}

export const colorsController = new ColorsController();