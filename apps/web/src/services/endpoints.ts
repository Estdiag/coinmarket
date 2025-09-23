export const API_ENDPOINTS = {
  GET_COINS: '/cryptocurrencies',
  GET_COIN_DETAILS: (id: string) => `/cryptocurrencies/${id}`,
  GET_HISTORICAL_DATA: (id: number) => `/cryptocurrencies/${id}/history`,
} as const;
