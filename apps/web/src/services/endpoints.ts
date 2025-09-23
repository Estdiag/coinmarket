export const API_ENDPOINTS = {
  GET_COINS: '/cryptocurrencies',
  GET_COIN_DETAILS: (id: number) => `/cryptocurrencies/${id}`,
  GET_HISTORICAL_DATA: (id: number) => `/cryptocurrencies/${id}/history`,
} as const;
