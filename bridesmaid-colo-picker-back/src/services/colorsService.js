import { Color } from "../models/colors.js";
import ColorException from "../models/exceptions/colorsException.js"

class ColorsService {

  getAvaibleColors = async () => {
    try{

        const colors =await Color.findAll({
            
            where: {
                avaiable: true
            },
        })
    } catch(error){
        throw new ColorException("Cannot list the colors because: " + error, 500);
    }



}

}

export const colorService = new ColorsService();