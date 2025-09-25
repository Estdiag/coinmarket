import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { PriceHistoryDB } from '@coinmarket/types';

export type PriceHistoryInstance = Model<PriceHistoryDB>;

const PriceHistoryModel = sequelize.define<PriceHistoryInstance>(
  'PriceHistory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cryptocurrency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cryptocurrencies',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
    },
    price_change_24h: {
      type: DataTypes.DECIMAL(15, 4),
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
    volume_24h: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    market_cap: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    total_supply: {
      type: DataTypes.DECIMAL(30, 2),
      allowNull: true,
    },
    circulating_supply: {
      type: DataTypes.DECIMAL(30, 2),
      allowNull: true,
    },
    record_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'price_history',
    timestamps: false,
    indexes: [
      {
        fields: ['cryptocurrency_id', 'record_date'],
      },
      {
        fields: ['record_date'],
      },
    ],
  }
);

export default PriceHistoryModel;
