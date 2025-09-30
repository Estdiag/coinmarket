import { Coin } from '@coinmarket/types';
import { Link } from 'react-router-dom';
import { formatCurrency, formatLargeNumber } from '@coinmarket/util';

type Props = {
  coin: Coin;
};

const getChangeClass = (valStr: string) => {
  const v = Number(valStr);
  if (!isFinite(v)) return 'text-gray-500';
  return v >= 0 ? 'text-green-600' : 'text-red-500';
};

export default function CoinCard({ coin }: Props) {
  const { name, symbol, price, market_cap, percent_change_24h } = coin;
  const parsedPrice = Number(price);

  return (
    <Link to={`/${coin.id}/historial`}>
      <article
        className="w-64 h-60 flex flex-col justify-between bg-gradient-to-br from-slate-100 via-white to-slate-200 
                       dark:from-slate-800 dark:via-slate-900 dark:to-slate-800
                       text-gray-900 dark:text-gray-100
                       rounded-2xl shadow-md p-5 transition transform hover:scale-105 hover:shadow-xl "
      >
        <header className="flex items-center gap-3 h-1/3">
          <div
            className="flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-xl px-1
                        bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold"
          >
            <p
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              title={symbol}
            >
              {symbol}
            </p>
          </div>
          <div className="flex flex-col min-h-14 justify-between w-full">
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug uppercase">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
          </div>
        </header>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Price</p>
          <p className="text-2xl font-bold text-center">{formatCurrency(parsedPrice)}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Market Cap
            </p>
            <p className="text-sm font-medium">
              {formatLargeNumber(market_cap)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">24h</p>
            <p
              className={`text-sm font-bold ${getChangeClass(
                percent_change_24h
              )}`}
            >
              {Number(percent_change_24h).toFixed(2)}%
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
