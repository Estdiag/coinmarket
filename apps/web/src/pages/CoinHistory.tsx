import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoHistoryChart from '@/components/CryptoHistoryChart';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useApi';
import {
  getCryptocurrencyHistory,
  getCryptocurrencyById,
} from '@/services/cryptocurrencies.api';
import { CoinDetails, HistoryDataItem } from '@coinmarket/types';
import CryptoDetail, { CryptoDetailProps } from './CointDetails';

export default function CoinHistory() {
  const { data, loading, execute } = useApi<HistoryDataItem[]>();
  const {
    data: dataDetails,
    loading: loadingDetails,
    execute: executeDetails,
  } = useApi<CoinDetails>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    execute(() => getCryptocurrencyHistory(Number(id)));
    executeDetails(() => getCryptocurrencyById(Number(id)));
  }, [execute, id, executeDetails]);

  const firstItem = data ? data[data.length - 1] : null;

  const infoDetails: CryptoDetailProps = {
    ...(dataDetails as CoinDetails),
    price: firstItem ? firstItem?.price : 0,
    marketCap: firstItem ? firstItem?.market_cap : 0,
    volume24h: firstItem ? firstItem?.volume_24h : 0,
    percentChange24h: firstItem ? firstItem?.percent_change_24h : 0,
    circulatingSupply: firstItem ? firstItem?.circulating_supply : 0,
    totalSupply: firstItem ? firstItem?.total_supply : 0,
  };

  if (loading || loadingDetails) return <Loading />;
  if (!data || !dataDetails) return null;

  return (
    <div className="flex flex-wrap gap-10 md:flex-nowrap">
      <CryptoDetail {...infoDetails} />
      <CryptoHistoryChart historyData={data} />
    </div>
  );
}
