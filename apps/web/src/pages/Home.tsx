import { getCryptocurrencies } from '@/services/cryptocurrencies.api';
import { useApi } from '@/hooks/useApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Coin } from '@coinmarket/types';
import CoinCard from '@/components/CoinCard';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { EmptyState } from '@/components/EmptyState';

export default function Home() {
  const { data, loading, execute } = useApi<Coin[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    execute(() => getCryptocurrencies());
  }, [execute]);

  const searchTermHandler = useCallback(
    (term: string) => {
      setSearchTerm(term);
    },
    [setSearchTerm]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm && data) return data;
    return data?.filter(
      coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const ComponentSearch = () => (
    <div className="w-full max-w-xl ml-auto mb-8">
      <Search searchTermHandler={searchTermHandler} searchTerm={searchTerm}/>
    </div>
  );

  if (loading) return <Loading />;

  if (!filteredData?.length) {
    return (
      <>
        <ComponentSearch />
        <EmptyState />
      </>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <ComponentSearch />

      <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
        {filteredData?.map(coin => (
          <CoinCard coin={coin} key={coin.name} />
        ))}
      </div>
    </div>
  );
}
