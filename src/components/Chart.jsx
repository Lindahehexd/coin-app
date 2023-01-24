import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const Chart = () => {
  const [chart, setChart] = useState({});
  const { id } = useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setChart(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
      });
  }, []);

  const chartData =
    chart.prices &&
    chart.prices.map((value) => ({
      x: value[0],
      y: value[1].toFixed(2),
    }));

  // console.log(chartData);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  const data = {
    labels: chartData && chartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: chartData && chartData.map((value) => value.y),
        borderColor: "rgb(83,176,223)",
        backgroundColor: "rgba(83,176,223,0.5)",
      },
    ],
  };

  return <Line options={options} data={data}></Line>;
};

export default Chart;
