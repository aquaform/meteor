import fetchIndicators from "@/app/hooks/fetch/fetchIndicators";
import fetchPointHistory from "@/app/hooks/fetch/fetchPointHistory";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import generateNewColorById from "@/app/helpers/generateColor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  widget: Widget;
};

export default function WidgetChart({ widget }: Props) {
  const indicatorsQuery = useQuery(["indicators"], () => fetchIndicators(), {
    keepPreviousData: true,
  });
  const indicatorIds =
    widget.indicators.map(
      (indicatorName) =>
        indicatorsQuery.data?.find(
          (indicator) => indicator.name === indicatorName
        )?.id
    ) ?? [];

  const fetchDataOptions = {
    pageIndex: 0,
    pageSize: 10,
    selectedPointId: widget.pointId,
    indicatorsCount: widget.indicators.length,
    indicators: indicatorIds,
  };

  const pointHistoryQuery = useQuery(
    ["pointHistory", fetchDataOptions],
    () => fetchPointHistory(fetchDataOptions),
    { keepPreviousData: true }
  );

  const labels = pointHistoryQuery.data?.tableData.data
    .reverse()
    .filter((measurement) => measurement.indicatorId === indicatorIds[0])
    .map((measurement) => {
      const date = new Date(measurement.time);

      return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
    });

  return (
    <Line
      data={{
        labels,
        datasets: indicatorIds
          .map((indicatorId) =>
            pointHistoryQuery.data?.tableData.data.filter(
              (indicator) => indicator.indicatorId === indicatorId
            )
          )
          .map((indicatorHistory, index) => ({
            label: indicatorHistory?.at(0)?.name,
            data: indicatorHistory
              ?.reverse()
              .map((indicator) => indicator.value),
            backgroundColor: generateNewColorById(index),
            borderColor: generateNewColorById(index),
          }))
          .concat(
            widget.customIndicators.map((indicator, index) => ({
              label: indicator.label,
              // 10 because that is the page size
              data: Array(10).fill(indicator.value),
              backgroundColor: generateNewColorById((index + 1) * 10),
              borderColor: generateNewColorById((index + 1) * 10),
            }))
          ),
      }}
      width="100%"
      height="100%"
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
}
