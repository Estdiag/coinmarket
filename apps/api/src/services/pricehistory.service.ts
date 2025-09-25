import { Op } from 'sequelize';
import PriceHistoryModel from '../models/pricehistory.model';
import CryptocurrencyModel from '../models/cryptocurrency.model';
import { coinMarketCapService } from './coinmarketcap.service';
import { CRYPTO_ALIAS, CRYPTO_ATTRIBUTES, CryptocurrencyApi, PriceHistoryDB } from '@coinmarket/types';

const saveDailyPriceHistory = async (cryptocurrencyData: CryptocurrencyApi) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const priceHistoryData: PriceHistoryDB = {
      cryptocurrency_id: cryptocurrencyData.id,
      price: cryptocurrencyData.quote.USD.price,
      price_change_24h: cryptocurrencyData.quote.USD.percent_change_24h,
      percent_change_1h: cryptocurrencyData.quote.USD.percent_change_1h,
      percent_change_24h: cryptocurrencyData.quote.USD.percent_change_24h,
      percent_change_7d: cryptocurrencyData.quote.USD.percent_change_7d,
      volume_24h: cryptocurrencyData.quote.USD.volume_24h,
      market_cap: cryptocurrencyData.quote.USD.market_cap,
      total_supply: cryptocurrencyData.total_supply,
      circulating_supply: cryptocurrencyData.circulating_supply,
      record_date: new Date(),
    };

    return await PriceHistoryModel.create(priceHistoryData);
  } catch (error) {
    console.error(
      `Error saving price history for crypto ${cryptocurrencyData.id}:`,
      error
    );
    throw error;
  }
};

const saveBulkPriceHistory = async (
  cryptocurrenciesData: CryptocurrencyApi[]
) => {
  try {
    for (const cryptoData of cryptocurrenciesData) {
      await saveDailyPriceHistory(cryptoData);
    }
    console.log(
      `Price history saved for ${cryptocurrenciesData.length} cryptocurrencies`
    );
  } catch (error) {
    console.error('Error saving bulk price history:', error);
    throw error;
  }
};

const syncPriceHistory = async (limit: number = 100) => {
  try {
    const cryptocurrencies = await coinMarketCapService.getCryptos(limit);
    await saveBulkPriceHistory(cryptocurrencies);
    console.log(
      `Price history synced for ${cryptocurrencies.length} cryptocurrencies`
    );
  } catch (error) {
    console.error('Error syncing price history:', error);
    throw error;
  }
};

const getPriceHistory = async (cryptocurrencyId: number, days: number = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await PriceHistoryModel.findAll({
      where: {
        cryptocurrency_id: cryptocurrencyId,
        record_date: {
          [Op.gte]: startDate,
        },
      },
      order: [['record_date', 'ASC']],
      include: [
        {
          model: CryptocurrencyModel,
          as: CRYPTO_ALIAS,
          attributes: [...CRYPTO_ATTRIBUTES],
        },
      ],
    });
  } catch (error) {
    console.error(
      `Error fetching price history for crypto ${cryptocurrencyId}:`,
      error
    );
    throw error;
  }
};

export const priceHistoryService = {
  getPriceHistory,
  syncPriceHistory,
};
