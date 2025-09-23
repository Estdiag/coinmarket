import Crypto from "./cryptocurrency.model";
import PriceHistory from "./pricehistory.model";


export const defineAssociations = (): void => {
  
  Crypto.hasMany(PriceHistory, {
    foreignKey: "cryptocurrency_id",
    as: "priceHistory",
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
  });

 
  PriceHistory.belongsTo(Crypto, {
    foreignKey: "cryptocurrency_id",
    as: "cryptocurrency"
  });

 
};
