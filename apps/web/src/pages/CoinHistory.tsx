import CryptoHistoryChart from '@/components/CryptoHistoryChart';
import Loading from '@/components/Loading';
import { useApi } from '@/hooks/useApi';
import { getCryptocurrencyHistory } from '@/services/cryptocurrencies.api';
import { HistoryDataItem } from '@coinmarket/types';
import { useEffect } from 'react';


export default function CoinHistory({ id, handleBack }: { id: number, handleBack: () => void }) {
  const { data, loading, execute } = useApi<HistoryDataItem[]>() ;

  useEffect(() => {
    execute(() => getCryptocurrencyHistory(id));
  }, [execute, id]);

  if (loading) return <Loading />;
  if (!data) return null;
  
  return (
    <>
      <CryptoHistoryChart historyData={data} />
      <button
        onClick={handleBack}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Volver
      </button>
    </>
  );
}
