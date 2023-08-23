"use client";

import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";
import {
  getExternalWindTooltip,
  getExternalTooltip,
} from "@/app/helpers/getExternalTooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function getOptions(): ChartOptions {
  // TODO(Vi): DRY!
  const currDate = new Date();
  const currHour = +currDate.getHours();
  const labels = Array(49)
    .fill(currHour)
    .map((hour: number, index: number) => (hour + index) % 24)
    .map((hour) => (hour > 9 ? String(hour) : `0${String(hour)}`));

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
        external: (context) => getExternalTooltip(context, labels),
      },
      legend: {
        position: "top" as const,
        labels: {
          filter(item, data) {
            return !!data.datasets[item.datasetIndex!].label;
          },
        },
      },
      title: {
        display: false,
        text: "Метеограмма",
      },
      annotation: {
        annotations: labels
          .map((_, index) => index)
          .filter((index) => labels[index] === "00")
          .map((index) => ({
            type: "line",
            xMin: index,
            xMax: index,
          })),
      },
    },
    elements: {
      point: {
        radius: 0,
        pointStyle: "cross",
      },
      line: {
        borderJoinStyle: "round",
        tension: 0.5,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    scales: {
      // TODO: This happens 40+ times, might be really costly
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        max: 5,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: { display: false },
      x1: {
        type: "category",
        grid: {
          drawOnChartArea: false,
        },
        display: false,
      },
      x2: {
        position: "top",
      },
    },
  };
}

function getWindChartOptions(
  weatherForecast: WeatherForecastType
): ChartOptions {
  const currDate = new Date();
  const currHour = +currDate.getHours();
  const labels = Array(49)
    .fill(currHour)
    .map((hour: number, index: number) => (hour + index) % 24)
    .map((hour) => (hour > 9 ? String(hour) : `0${String(hour)}`));

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
        external: (context) =>
          getExternalWindTooltip(context, labels, weatherForecast),
      },
      legend: {
        position: "bottom",
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        pointStyle: "cross",
      },
      line: {
        borderJoinStyle: "round",
        tension: 0.5,
      },
    },
  };
}

function getWindChartData(
  weatherForecast: WeatherForecastType
): ChartData<any> {
  const currDate = new Date();

  const labels = Array(49).fill("");
  const smallestLargerHour = weatherForecast.properties.timeseries.find(
    (measurement) => currDate.toISOString() < measurement.time
  );
  const currHourIndex =
    weatherForecast.properties.timeseries.indexOf(smallestLargerHour!) - 1;
  const actualWeatherForecastData =
    weatherForecast.properties.timeseries.slice(currHourIndex);
  const windSpeedData = actualWeatherForecastData.map(
    (measurement) => measurement.data.instant.details.wind_speed
  );

  return {
    labels,
    datasets: [
      {
        label: "Скорость ветра, м/с",
        data: windSpeedData,
        backgroundColor: "#aa00f2",
        borderColor: "#aa00f2",
      },
    ],
  };
}

function getChartData(
  weatherForecast: WeatherForecastType,
  icons: { [weatherIcon: string]: HTMLImageElement }
): ChartData<any> {
  const currDate = new Date();
  const currHour = +currDate.getHours();

  const labels = Array(49)
    .fill(currHour)
    .map((hour: number, index: number) => (hour + index) % 24)
    .map((hour) => (hour > 9 ? String(hour) : `0${String(hour)}`))
    .map((hour) => (+hour % 2 ? "" : hour));
  const smallestLargerHour = weatherForecast.properties.timeseries.find(
    (measurement) => currDate.toISOString() < measurement.time
  );
  const currHourIndex =
    weatherForecast.properties.timeseries.indexOf(smallestLargerHour!) - 1;
  const temperatureData = weatherForecast.properties.timeseries
    .slice(currHourIndex)
    .map((measurement) => measurement.data.instant.details.air_temperature);

  const actualWeatherForecastData =
    weatherForecast.properties.timeseries.slice(currHourIndex);

  const iconDatasets = Object.keys(icons).map((weatherType) => ({
    data: actualWeatherForecastData.map((measurement, index) =>
      measurement.data.next_1_hours?.summary.symbol_code === weatherType &&
      !(index % 2) &&
      index !== 0 &&
      index !== 48 // TODO: OH MY GOD PLEASE KILL ME
        ? measurement.data.instant.details.air_temperature + 3
        : null
    ),
    fill: false,
    pointStyle: icons[weatherType],
    pointRadius: 22,
    pointHoverRadius: 22,
    type: "line",
    xAxisID: "x2",
  }));

  return {
    labels,
    datasets: [
      {
        label: "Температура, °C",
        data: temperatureData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        type: "line",
        xAxisID: "x2",
      },
      {
        label: "Осадки, мм",
        data: actualWeatherForecastData.map(
          (measurement) =>
            measurement.data.next_1_hours?.details.precipitation_amount
        ),
        type: "bar",
        yAxisID: "y1",
        xAxisID: "x1",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      ...iconDatasets,
    ],
  };
}

export default function Meteogram() {
  const [icons, setIcons] = useState<{
    [weatherIcon: string]: HTMLImageElement;
  }>({});
  const [weatherForecast, setWeatherForecast] = useState<
    WeatherForecastType | undefined
  >(undefined);
  const [weatherDict, setWeatherDict] = useState<{
    [weatherIcon: string]: number;
  }>({});

  const getWeatherForecast = async () => {
    const { data } = await axios.get(
      "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=61.25755&lon=73.400446"
    );

    const tempDict: any = {};
    data.properties.timeseries
      .slice(0, 48)
      .forEach((weatherMeasurement: any) => {
        if (
          !tempDict[weatherMeasurement.data.next_1_hours?.summary.symbol_code]
        ) {
          tempDict[
            weatherMeasurement.data.next_1_hours.summary.symbol_code
          ] = 1;
        }
      });

    const tempIcons: any = {};
    Object.keys(tempDict).forEach((weatherIcon) => {
      const newIcon = new Image();
      newIcon.src = `/icons/${weatherIcon}.svg`;

      tempIcons[weatherIcon] = newIcon;
    });

    setWeatherDict(tempDict);
    setWeatherForecast(data);
    setIcons(tempIcons);
  };

  useEffect(() => {
    getWeatherForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white m-6 w-full dark:bg-dark rounded p-4">
      {!!weatherForecast && (
        <>
          <h2 className="m-auto block text-2xl font-bold text-center">
            Температура и осадки
          </h2>
          <div className="h-4/6 w-full">
            <Bar
              data={getChartData(weatherForecast, icons)}
              options={getOptions()}
            />
          </div>
          <h2 className="m-auto block text-2xl font-bold text-center">
            Скорость и направление ветра
          </h2>
          <div>
            <Line
              data={getWindChartData(weatherForecast)}
              options={getWindChartOptions(weatherForecast)}
              plugins={[
                {
                  id: "afterDrawPlugin",
                  // TODO: This happens 40+ times, might be really costly
                  afterDraw: (chart) => {
                    const { ctx } = chart;
                    const xAxis = chart.scales.x;
                    const yAxis = chart.scales.y;
                    xAxis.ticks.forEach((value, index) => {
                      const x = xAxis.getPixelForTick(index);
                      const image = new Image();
                      image.src = `/icons/wind_direction.svg`;
                      ctx.save();
                      ctx.translate(x + 6, yAxis.bottom);

                      ctx.translate(7, 7);
                      ctx.rotate(
                        ((weatherForecast.properties.timeseries[index].data
                          .instant.details.wind_from_direction -
                          90) *
                          Math.PI) /
                          180
                      );
                      ctx.translate(-7, -7);
                      ctx.drawImage(image, 0, 0);
                      ctx.restore();
                    });
                  },
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
