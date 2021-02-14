import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchDailyConfirmed, fetchDailyTested } from "../../api";

import styles from "./Chart.module.css";

import {
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

// let state = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jammu and Kashmir",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttarakhand",
//   "Uttar Pradesh",
//   "West Bengal",
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli",
//   "Daman and Diu",
//   "Delhi",
//   "Lakshadweep",
//   "Puducherry",
// ];

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);
  const [dailyTestingData, setDailyTestingData] = useState([]);
  // const [stateFilters, setStateFilters] = useState("All");

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
            data: dailyData.map(({ summary: { total } }) => total),
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
  ) : (
    "loading..."
  );

 

  // const LineChart2 = dailyData.length ? (
  //   <Line
  //     data={
  //       stateFilters !== "All"
  //         ? {
  //             labels: dailyData.map(({ day }) => day),
  //             datasets: [
  //               {
  //                 data: filteredTableData().map(
  //                   ({ regional: { total } }) => total
  //                 ),
  //                 label: "Total confirmed cases",
  //                 borderColor: "#3333ff",
  //                 fill: true,
  //               },
  //               {
  //                 data: filteredTableData().map(
  //                   ({ regional: { deaths } }) => deaths
  //                 ),
  //                 label: "Total sample tested",
  //                 borderColor: "red",
  //                 backgroundColor: "rgba(250, 0, 0, 0.5)",
  //                 fill: true,
  //               },
  //               {
  //                 data: filteredTableData().map(
  //                   ({ regional: { discharged } }) => discharged
  //                 ),
  //                 label: "Total sample tested",
  //                 borderColor: "red",
  //                 backgroundColor: "rgba(250, 0, 0, 0.5)",
  //                 fill: true,
  //               },
  //             ],
  //           }
  //         : {
  //             labels: dailyData.map(({ day }) => day),
  //             datasets: [
  //               {
  //                 data: dailyData.map(({ summary: { total } }) => total),
  //                 label: "Total confirmed cases",
  //                 borderColor: "#3333ff",
  //                 fill: true,
  //               },
  //               {
  //                 data: dailyData.map(({ summary: { deaths } }) => deaths),
  //                 label: "Total sample tested",
  //                 borderColor: "red",
  //                 backgroundColor: "rgba(250, 0, 0, 0.5)",
  //                 fill: true,
  //               },
  //               {
  //                 data: dailyData.map(
  //                   ({ summary: { discharged } }) => discharged
  //                 ),
  //                 label: "Total sample tested",
  //                 borderColor: "red",
  //                 backgroundColor: "rgba(250, 0, 0, 0.5)",
  //                 fill: true,
  //               },
  //             ],
  //           }
  //     }
  //   />
  // ) : (
  //   "loading..."
  // );

  // const handleChangeState = (event) => {
  //   setStateFilters(event.target.value);
  // };

  return (
    <div className={styles.container}>
      {lineChart}

      {/* <Toolbar className={styles.toolbar}>
        <FormControl className={styles.formControl}>
          <InputLabel>State</InputLabel>
          <Select value={stateFilters} onChange={handleChangeState}>
            <MenuItem value="All">All</MenuItem>
            {state.map((x) => (
              <MenuItem value={x}>{x}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar> */}
      {/* {LineChart2} */}
    </div>
  );
};

export default Chart;
