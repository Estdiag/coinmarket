export interface PriceHistoryDB {
  id?: number;
  cryptocurrency_id: number;
  price: number;
  price_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  volume_24h: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: number;
  record_date: Date;
}