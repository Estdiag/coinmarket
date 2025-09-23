import { Coin } from "@coinmarket/types";

type Props = {
  coin: Coin;
};

const formatCurrency = (value: string | number) => {
  const num = typeof value === "string" ? Number(value) : value;
  if (!isFinite(num)) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(num);
};

const formatLargeNumber = (value: string | number) => {
  const num = typeof value === "string" ? Number(value) : value;
  if (!isFinite(num)) return "-";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

const getChangeClass = (valStr: string) => {
  const v = Number(valStr);
  if (!isFinite(v)) return "text-gray-500";
  return v >= 0 ? "text-green-600" : "text-red-500";
};

export default function CoinCard({ coin }: Props) {
  const { name, symbol, price, market_cap, percent_change_24h } = coin;
  const parsedPrice = Number(price);

  return (
    <article className="w-64 bg-gradient-to-br from-slate-100 via-white to-slate-200 
                       dark:from-slate-800 dark:via-slate-900 dark:to-slate-800
                       text-gray-900 dark:text-gray-100
                       rounded-2xl shadow-md p-5 transition transform hover:scale-105 hover:shadow-xl">
    
      <header className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl 
                        bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold">
          {symbol}
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-snug">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
        </div>
      </header>

      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
        <p className="text-2xl font-bold">{formatCurrency(parsedPrice)}</p>
      </div>

    
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="text-sm font-medium">{formatLargeNumber(market_cap)}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">24h</p>
          <p className={`text-sm font-bold ${getChangeClass(percent_change_24h)}`}>
            {Number(percent_change_24h).toFixed(2)}%
          </p>
        </div>
      </div>
    </article>
  );
}
