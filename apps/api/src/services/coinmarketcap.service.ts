import axios from 'axios';
import {
  CoinMarketCapResponse,
  Cryptocurrency,
} from '../types/cryptocurrency.types';
import CryptocurrencyModel from '../models/cryptocurrency.model';

const apiKey = process.env.COINMARKETCAP_API_KEY || '';
const baseURL = process.env.COINMARKETCAP_BASE_URL || '';

const getHeaders = () => ({
  'X-CMC_PRO_API_KEY': apiKey,
  'Content-Type': 'application/json',
});

 const getCryptos = async (
  limit: number = 100
): Promise<Cryptocurrency[]> => {
  try {
    const response = await axios.get<CoinMarketCapResponse>(
      `${baseURL}/cryptocurrency/listings/latest`,
      {
        headers: getHeaders(),
        params: { start: 1, limit, convert: 'USD' },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw new Error('Failed to fetch cryptocurrencies from CoinMarketCap');
  }
};

 const fetchCryptocurrencyById = async (
  id: number
): Promise<Cryptocurrency> => {
  try {
    const response = await axios.get<{
      data: { [key: string]: Cryptocurrency };
    }>(`${baseURL}/cryptocurrency/quotes/latest`, {
      headers: getHeaders(),
      params: { id, convert: 'USD' },
    });

    const cryptocurrency = response.data.data[id.toString()];
    if (!cryptocurrency)
      throw new Error(`Cryptocurrency with id ${id} not found`);

    return cryptocurrency;
  } catch (error) {
    console.error(`Error fetching cryptocurrency ${id}:`, error);
    throw new Error(`Failed to fetch cryptocurrency ${id} from CoinMarketCap`);
  }
};


 const syncCryptocurrenciesToDB = async () => {
  try {
    const cryptocurrencies = await getCryptos(100);

    for (const crypto of cryptocurrencies) {
      await CryptocurrencyModel.upsert({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        slug: crypto.slug,
        cmc_rank: crypto.cmc_rank,
        price: crypto.quote.USD.price,
        volume_24h: crypto.quote.USD.volume_24h,
        percent_change_1h: crypto.quote.USD.percent_change_1h,
        percent_change_24h: crypto.quote.USD.percent_change_24h,
        percent_change_7d: crypto.quote.USD.percent_change_7d,
        market_cap: crypto.quote.USD.market_cap,
        last_updated: new Date(crypto.quote.USD.last_updated),
      });
    }

    console.log('✅ Cryptocurrencies synced to DB successfully.');
  } catch (error) {
    console.error('❌ Error syncing cryptocurrencies:', error);
  }
};

export const coinMarketCapService = {
  getCryptos,
  fetchCryptocurrencyById,
  syncCryptocurrenciesToDB
};


