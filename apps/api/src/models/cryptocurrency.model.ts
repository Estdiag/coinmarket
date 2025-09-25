import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { CryptocurrencyDB } from '@coinmarket/types';

interface CryptocurrencyCreationAttributes
  extends Optional<CryptocurrencyDB, 'id'> {}

const CryptocurrencyModel = sequelize.define<
  Model<CryptocurrencyDB, CryptocurrencyCreationAttributes>
>(
  'Cryptocurrency',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cmc_rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    volume_24h: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    percent_change_1h: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    percent_change_24h: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    percent_change_7d: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    market_cap: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'cryptocurrencies',
    timestamps: true,
  }
);

export default CryptocurrencyModel;
