import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from './endpoints';
import { Cryptocurrency, Coin, HistoryDataItem } from '@coinmarket/types';

export async function getCryptocurrencies(): Promise<Coin[]> {
  const { data } = await apiClient.get(API_ENDPOINTS.GET_COINS);
  return data;
}

export async function getCryptocurrencyById(id: number): Promise<Cryptocurrency> {
  const { data } = await apiClient.get(API_ENDPOINTS.GET_COIN_DETAILS(id));
  return data;
}

export async function getCryptocurrencyHistory(id: number): Promise<HistoryDataItem[]> {
  const { data } = await apiClient.get(API_ENDPOINTS.GET_HISTORICAL_DATA(id));
  return data;
}
