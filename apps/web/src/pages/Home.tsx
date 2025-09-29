import { getCryptocurrencies } from '@/services/cryptocurrencies.api';
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';
import { Coin } from '@coinmarket/types';
import CoinCard from '@/components/CoinCard';
import Loading from '@/components/Loading';

export default function Home() {
  const { data, loading, execute } = useApi<Coin[]>();

  useEffect(() => {
    execute(() => getCryptocurrencies());
  }, [execute]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {data?.map(coin => (
        <CoinCard coin={coin} key={coin.name} />
      ))}
    </div>
  );
}
