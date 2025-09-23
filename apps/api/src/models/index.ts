import sequelize from "../config/database";
import Crypto from "./cryptocurrency.model";
import PriceHistory from "./pricehistory.model";
import { defineAssociations } from "./associations";

export { Crypto, PriceHistory, sequelize };

export const initializeModels = async (): Promise<void> => {
  try {   
    defineAssociations();       
    console.log('Modelos inicializados correctamente');
  } catch (error) {
    console.error('Error inicializando modelos:', error);
    throw error;
  }
};

export default {
  Crypto,
  PriceHistory,
  sequelize,
  initializeModels
};