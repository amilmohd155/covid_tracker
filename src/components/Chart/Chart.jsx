import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchDailyConfirmed, fetchDailyTested } from "../../api";

import styles from "./Chart.module.css";

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);
  const [dailyTestingData, setDailyTestingData] = useState([]);

  useEffect(() => {
    (async () => {
      setDailyTestingData(await fetchDailyTested());
    })();

    (async () => {
      setDailyData(await fetchDailyConfirmed());
    })();
  });

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ day }) => day),
        datasets: [
          {
            data: dailyData.map(({ total }) => total),
            label: "Total confirmed cases",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyTestingData.map(
              ({ totalSamplesTested }) => totalSamplesTested
            ),
            label: "Total sample tested",
            borderColor: "red",
            backgroundColor: "rgba(250, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : "loading...";

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
