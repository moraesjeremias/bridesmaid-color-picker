import ColorException from "../models/exceptions/colorsException.js";
import { colorService } from "../services/colorsService.js";

class ColorsController {

  async avaiableColors(request, response) {
    try {
      const { available } = request.query;
      const result = await colorService.getColors(available);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(error.status || 500).json(error.message);
    }
  }

  async chooseColor(request, response) {
      try {

        const {userId, colorId } = request.body;

        const result = await colorService.reserveColor(userId,colorId);

        return response.status(200).body(result);

      } catch (error) {
        
        throw new ColorException(error.getMessage, error.getStatus )
      }
  }

  async checkStatusColor(request, response) {

  }
}

export const colorsController = new ColorsController();