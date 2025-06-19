import ColorException from "../models/exceptions/colorsException.js";
import { colorService } from "../services/colorsService.js";

class ColorsController {

    async getColor(request, response) {
        try {
            const { id } = request.params;
            const result = await colorService.getColor(id);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(error.status || 500).json(error.message);
        }
    }

  async getColors(request, response) {
    try {
      const { available } = request.query;
      const result = await colorService.getAvaibleColors(available);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(error.status || 500).json(error.message);
    }
  }

  async chooseColor(request, response) {
      try {

        const {userId, colorId } = request.body;

        const result = await colorService.reserveColor(userId,colorId);

        return response.status(200).json(result);

      } catch (error) {
        if (!error.status) {
          return response.status(500).json(error.message);
        }
        return response.status(error.status).json(error.message);
      }
  }

  async checkStatusColor(request, response) {

  }
}

export const colorsController = new ColorsController();