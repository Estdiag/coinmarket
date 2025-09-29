import { HistoryDataItem } from "@coinmarket/types";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function CryptoHistoryChart({ historyData }: { historyData: HistoryDataItem[] }) {

   const seriesData = useMemo(() => {
    return historyData.map((item) => [
      new Date(item.record_date).getTime(),
      Number(item.price),
    ]);
  }, [historyData]);

   const mainOptions: ApexOptions = {
    chart: {
      id: "mainChart",
      type: "line",
      height: 230,
      width: 100,
      toolbar: { autoSelected: "pan", show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth" },
    xaxis: { type: "datetime" },
    tooltip: { x: { format: "dd MMM yyyy HH:mm" } },
  };


  const brushOptions: ApexOptions = {
    chart: {
      id: "brushChart",
      height: 130,
      type: "area",
      brush: {
        target: "mainChart",
        enabled: true,
      },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date(historyData[0].record_date).getTime(),
          max: new Date(historyData[Math.floor(historyData.length / 3)].record_date).getTime(),
        },
      },
    },
    colors: ["#008FFB"],
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      },
    },
    xaxis: { type: "datetime", tooltip: { enabled: false } },
    yaxis: { tickAmount: 2 },
  };

    return (
    <div  className="w-full max-w-3xl">
      
      <ReactApexChart
        options={mainOptions}
        series={[{ name: "Precio", data: seriesData }]}
        type="line"
        height={300}
      />

      
      <ReactApexChart
        options={brushOptions}
        series={[{ name: "Precio", data: seriesData }]}
        type="area"
        height={130}
      />
    </div>
  );
}
