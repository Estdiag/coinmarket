import { FC } from 'react';
import { CoinDetails } from '@coinmarket/types';
import { formatCurrency, formatLargeNumber } from '@coinmarket/util';

export interface CryptoDetailProps extends CoinDetails {
  price: number;
  marketCap: number;
  volume24h: number;
  percentChange24h: number;
  circulatingSupply: number;
  totalSupply: number;
}

const CryptoDetail: FC<CryptoDetailProps> = ({
  name,
  symbol,
  category,
  description,
  logo,
  price,
  marketCap,
  volume24h,
  percentChange24h,
  circulatingSupply,
  totalSupply,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6">
        <img src={logo} alt={name} className="w-16 h-16" />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">
            {name} <span className="text-gray-500 text-lg">{symbol}</span>
          </h1>
          <p className="text-sm text-gray-400 uppercase">{category}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 [&>*]:text-center">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Precio actual</p>
          <p className="text-xl font-semibold">{formatCurrency(price)}</p>
          <p
            className={`text-sm ${
              percentChange24h && percentChange24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {percentChange24h}% (24h)
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-xl font-semibold">
            {formatLargeNumber(marketCap)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Volumen 24h</p>
          <p className="text-xl font-semibold">
            {formatLargeNumber(volume24h)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 [&>*]:text-center">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Circulating Supply</p>
          <p className="text-lg font-semibold">
            {formatLargeNumber(circulatingSupply)} {symbol}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Supply</p>
          <p className="text-lg font-semibold">
            {formatLargeNumber(totalSupply)} {symbol}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Descripción</h2>
        <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CryptoDetail;
