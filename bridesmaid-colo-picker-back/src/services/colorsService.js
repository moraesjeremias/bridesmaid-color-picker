import { Color } from "../models/colors.js";
import ColorException from "../models/exceptions/colorsException.js"

class ColorsService {

  getColors = async (availability) => {
    try{
        const colors = await Color.findAll({
            where: {
                avaiable: availability
            },
        })
        return colors;
    } catch(error){
        throw new ColorException("Cannot list the colors because: " + error, 500);
    }
}
}

export const colorService = new ColorsService();