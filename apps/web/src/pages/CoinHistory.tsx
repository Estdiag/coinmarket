import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CryptoHistoryChart from '@/components/CryptoHistoryChart';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useApi';
import { getCryptocurrencyHistory } from '@/services/cryptocurrencies.api';
import { HistoryDataItem } from '@coinmarket/types';

export default function CoinHistory() {
  const { data, loading, execute } = useApi<HistoryDataItem[]>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    execute(() => getCryptocurrencyHistory(Number(id)));
  }, [execute, id]);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <>
      <CryptoHistoryChart historyData={data} />
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        <Link to="/">Volver al Home</Link>
      </button>
    </>
  );
}
