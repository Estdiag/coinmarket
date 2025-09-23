import { Coin, HistoryDataItem } from '@coinmarket/types';
import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';

export interface Cryptocurrency {
  name: string;
  symbol: string;
}

interface Metric {
  key: keyof Coin;
  label: string;
  formatter: (value: string | number) => string;
}

interface CryptoHistoryChartProps {
  historyData?: HistoryDataItem[];
}

const CryptoHistoryChart: React.FC<CryptoHistoryChartProps> = ({
  historyData = [],
}) => {
  const [selectedMetric, setSelectedMetric] =
    useState<keyof HistoryDataItem>('price');

  const metrics: Metric[] = useMemo(
    () => [
      {
        key: 'price',
        label: 'Precio',
        formatter: value => `$${parseFloat(value as string).toFixed(8)}`,
      },
      {
        key: 'percent_change_24h',
        label: 'Cambio 24h',
        formatter: value => `${parseFloat(value as string).toFixed(2)}%`,
      },
      {
        key: 'volume_24h',
        label: 'Volumen 24h',
        formatter: value => `$${parseFloat(value as string).toLocaleString()}`,
      },
      {
        key: 'market_cap',
        label: 'Market Cap',
        formatter: value => `$${parseFloat(value as string).toLocaleString()}`,
      },
      {
        key: 'percent_change_1h',
        label: '% Cambio 1h',
        formatter: value => `${parseFloat(value as string).toFixed(2)}%`,
      },
      {
        key: 'percent_change_7d',
        label: '% Cambio 7d',
        formatter: value => `${parseFloat(value as string).toFixed(2)}%`,
      },
    ],
    []
  );

  const chartData = useMemo(() => {
    const sortedData = historyData && [...historyData].sort(
      (a, b) =>
        new Date(a.record_date).getTime() - new Date(b.record_date).getTime()
    );

    return {
      series: [
        {
          name: metrics.find(m => m.key === selectedMetric)?.label || 'Valor',
          data: sortedData.map(item => ({
            x: new Date(item.record_date),
            y: parseFloat(item[selectedMetric] as string),
          })),
        },
      ],
      categories: sortedData.map(item => new Date(item.record_date)),
    };
  }, [historyData, selectedMetric, metrics]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: `Trazabilidad de ${
        historyData[0]?.cryptocurrency?.name || 'Criptomoneda'
      }`,
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      title: {
        text: metrics.find(m => m.key === selectedMetric)?.label,
      },
      labels: {
        formatter: function (value: number) {
          const formatter = metrics.find(
            m => m.key === selectedMetric
          )?.formatter;
          return formatter ? formatter(value) : value.toFixed(2);
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm',
      },
      y: {
        formatter: function (value: number) {
          const formatter = metrics.find(
            m => m.key === selectedMetric
          )?.formatter;
          return formatter ? formatter(value) : value.toFixed(4);
        },
      },
    },
    colors: ['#3B82F6'],
  };

  if (historyData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">No hay datos históricos disponibles</p>
      </div>
    );
  }

  const currentCrypto = historyData[0]?.cryptocurrency;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentCrypto?.name} ({currentCrypto?.symbol})
          </h2>
          <p className="text-gray-600">Historial de precios y métricas</p>
        </div>

        {/* Selector de métricas */}
        <div className="mt-4 md:mt-0">
          <label
            htmlFor="metric-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar métrica:
          </label>
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={e =>
              setSelectedMetric(e.target.value as keyof HistoryDataItem)
            }
            className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {metrics.map(metric => (
              <option key={metric.key} value={metric.key}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default CryptoHistoryChart;
