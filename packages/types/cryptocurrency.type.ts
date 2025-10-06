import { CRYPTO_ALIAS, CRYPTO_ATTRIBUTES } from './constants';
import { PriceHistoryDB } from './priceHistory.type';

export interface CryptocurrencyApi {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      last_updated: string;
    };
  };
}

export interface CryptocurrencyDB {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  last_updated: Date;
}

export interface CoinMarketCapResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
  };
  data: CryptocurrencyApi[];
}

export type Coin = {
  id: number;
  cmc_rank: number;
  createdAt: string;
  updatedAt: string;
  last_updated: string;
  market_cap: number;
  name: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  price: string;
  slug: string;
  symbol: string;
  volume_24h: string;
};

export interface CoinDetails {
  id: any;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;  
}

export interface HistoryDataItem extends PriceHistoryDB {
  [CRYPTO_ALIAS]: { [K in (typeof CRYPTO_ATTRIBUTES)[number]]: string };
}
