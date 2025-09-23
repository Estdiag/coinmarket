import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from './endpoints';
import { Cryptocurrency, Coin } from '@coinmarket/types';

export async function getCryptocurrencies(): Promise<Coin[]> {
  const { data } = await apiClient.get(API_ENDPOINTS.GET_COINS);
  return data;
}

export async function getCryptocurrencyById(id: string): Promise<Cryptocurrency> {
  const { data } = await apiClient.get(API_ENDPOINTS.GET_COIN_DETAILS(id));
  return data;
}
