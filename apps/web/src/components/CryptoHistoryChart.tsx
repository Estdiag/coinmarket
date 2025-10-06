import { HistoryDataItem } from '@coinmarket/types';
import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { formatCurrency } from '@coinmarket/util';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function CryptoHistoryChart({
  historyData,
}: {
  historyData: HistoryDataItem[];
}) {
  const seriesData = useMemo(() => {
    return historyData.map(item => [
      new Date(item.record_date).getTime(),
      Number(item.price),
    ]);
  }, [historyData]);
  const isMobile = useMediaQuery();
  const firstDate = new Date(historyData[0].record_date).getTime();
  const lastDate = new Date(
    historyData[historyData.length - 1].record_date
  ).getTime();

  const mainOptions: ApexOptions = {
    chart: {
      id: 'mainChart',
      type: 'line',
      height: 230,
      background: '#1e293b',
      toolbar: { autoSelected: 'pan', show: false },
      zoom: { enabled: false },
    },
    theme: { mode: 'dark' },
    stroke: { curve: 'smooth', width: 2, colors: ['#38bdf8'] },
    xaxis: {
      type: 'datetime',
      min: firstDate,
      max: lastDate,
      labels: {
        style: { colors: '#cbd5e1' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#cbd5e1' },
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      x: { format: 'dd MMM yyyy HH:mm' },
      theme: 'dark',
    },
    grid: { borderColor: '#334155' },
  };

  const brushOptions: ApexOptions = {
    chart: {
      id: 'brushChart',
      height: 130,
      type: 'area',
      background: '#1e293b',
      brush: { target: 'mainChart', enabled: true },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date(
            historyData[Math.floor(historyData.length / 3)].record_date
          ).getTime(),
          max: lastDate,
        },
      },
    },
    theme: { mode: 'dark' },
    colors: ['#38bdf8'],
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.4, opacityTo: 0.05 },
    },
    xaxis: { type: 'datetime', min: firstDate, max: lastDate },
    yaxis: {
      tickAmount: 2,
      labels: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
  };

  return (
    <div className="w-full max-w-3xl h-fit bg-slate-900 p-4 rounded-xl shadow-lg">
            <ReactApexChart
        options={mainOptions}
        series={[{ name: 'Precio', data: seriesData }]}
        type="line"
        height={300}
      />
      {(isMobile || historyData.length > 50) && (
        <ReactApexChart
          options={brushOptions}
          series={[{ name: 'Precio', data: seriesData }]}
          type="area"
          height={130}
        />
      )}
    </div>
  );
}
