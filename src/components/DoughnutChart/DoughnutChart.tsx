import React from "react";
import { Chart } from "primereact/chart";

import classes from "./DoughnutChart.module.css";

export const DoughnutChart = (macronutrients: Array<number>) => {
  const chartData = {
    labels: ["Carbs", "Protein", "Fat"],
    datasets: [
      {
        data: macronutrients,
        backgroundColor: ["#81B622", "#F1C0B9", "#FFCE58"],
        hoverBackgroundColor: [
          "rgb(160, 160, 160)",
          "rgb(160, 160, 160)",
          "rgb(160, 160, 160)",
        ],
      },
    ],
  };

  const lightOptions = {
    legend: {
      labels: {
        fontColor: "rgb(78, 78, 78)",
      },
    },
  };

  return (
    <div className={classes.card}>
      <Chart type="doughnut" data={chartData} options={lightOptions} />
    </div>
  );
};
