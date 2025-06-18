import sequelize from "../config/dbConnection.js";
import { Color } from "../models/colors.js";
import ColorException from "../models/exceptions/colorsException.js"

class ColorsService {

    getAvaibleColors = async (query) => {
        try {

            const colors = await Color.findAll({
                where: {
                    //Ajustar o endpoint pra receber na query o avaiable se é true ou false
                    available: query,
                },
            })
            return colors;
        } catch (error) {
            throw new ColorException("Cannot list the colors because: " + error, 500);
        }
    }

    //Ficou desse tamanho? Sim, mas tá garantindo Pessimistic Locking
    reserveColor = async (userId, colorId) => {
        try {

            const transaction = await sequelize.transaction({
                isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            });

            const color = await Color.findByPk(colorId, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (color.status !== "AVAILABLE" || !color.available) {
                throw new ColorException("Cor não está mais disponível", 404);
            };

            const userExistingColor = await Color.findOne({
                where: {
                    userId,
                    status: ['CONFIRMED']
                },
                transaction,
                lock: transaction.LOCK.SHARE
            });

            if (userExistingColor) {
                throw new ColorException("Usuário já possui uma cor reservada", 400);
            }

            await Color.update({
                status: 'CONFIRMED',
                userId,
                avaiable: false,
                reservedAt: new Date(),
            }, {
                where: {
                    id: colorId
                },
                transaction
            });

            await transaction.commit();

            return {
                sucess: true,
                color: color.displayname,
                message: "Cor reservada com sucesso"
            }

        } catch (error) {

            await transaction.rollback();

            if (error.name === 'SequelizeUniqueConstraintError' ||
                error.message.includes('unique_user_active_color')) {
                throw new ColorException('Usuário já possui uma cor reservada', 400);
            }

            throw error;
        }

    }

}

export const colorService = new ColorsService();