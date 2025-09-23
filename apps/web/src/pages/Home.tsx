import { getCryptocurrencies } from '@/services/cryptocurrencies.api';
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';
import { Coin } from '@coinmarket/types';
import CoinCard from '@/components/CoinCard';

export default function Home() {
  const { data, loading, execute } = useApi<Coin[]>();

  useEffect(() => {
    execute(() => getCryptocurrencies());
  }, [execute]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='flex flex-wrap gap-6 justify-center p-6'>
      {data?.map(coin => (
        <CoinCard coin={coin} key={coin.name} />
      ))}       
    </div>
  );
}
