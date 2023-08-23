import { Chart, ChartType, TooltipModel } from "chart.js";

const monthNames = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const getExternalTooltip = (
  context: {
    chart: Chart;
    tooltip: TooltipModel<ChartType>;
  },
  labels: string[]
) => {
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem: {
    before: string[];
    lines: string[];
    after: string[];
  }) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = [labels[context.tooltip.dataPoints[0].dataIndex]];
    const bodyLines = tooltipModel.body.map(getBody).slice(0, 2);
    const index = context.tooltip.dataPoints[0].dataIndex;
    const currDate = new Date();
    let currDay = currDate.getDay();
    let currMonth = monthNames[currDate.getMonth()];
    const firstDayEndIndex = labels.indexOf("00");
    const secondDayEndIndex = labels.lastIndexOf("00");
    let day = `${currDay} ${currMonth}`;
    if (index > firstDayEndIndex && index <= secondDayEndIndex) {
      const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      currDay = tomorrowDate.getDay();
      currMonth = monthNames[tomorrowDate.getMonth()];

      day = `${currDay} ${currMonth}`;
    } else if (index > secondDayEndIndex) {
      const tomorrowDate = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000 * 2
      );
      currDay = tomorrowDate.getDay();
      currMonth = monthNames[tomorrowDate.getMonth()];
      day = `${currDay} ${currMonth}`;
    }

    let innerHtml = "<thead>";

    titleLines.forEach((title) => {
      innerHtml += `<tr><th>${day} ${title}:00</th></tr>`;
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach((body, i) => {
      const colors = tooltipModel.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += "; border-width: 2px";
      const span = `<span style="${style}">${body}</span>`;
      innerHtml += `<tr><td>${span}</td></tr>`;
    });
    innerHtml += "</tbody>";

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot!.innerHTML = innerHtml;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  // const bodyFont = ChartJS;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = "1";
  tooltipEl.style.position = "absolute";
  const currentXPosition =
    position.left + window.scrollX + tooltipModel._eventPosition.x;
  tooltipEl.style.left = `${
    currentXPosition + 150 > window.innerWidth
      ? currentXPosition - 150
      : currentXPosition
  }px`;
  tooltipEl.style.top = `${
    position.top + window.scrollY + tooltipModel._eventPosition.y
  }px`;
  // tooltipEl.style.font = bodyFont.string;
  tooltipEl.style.padding = "10px 10px";
  tooltipEl.style.background = "white";
  tooltipEl.style.borderRadius = "5px";
  tooltipEl.style.boxShadow =
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
  tooltipEl.style.pointerEvents = "none";
};

const getExternalWindTooltip = (
  context: {
    chart: Chart;
    tooltip: TooltipModel<ChartType>;
  },
  labels: string[],
  weatherForecast: WeatherForecastType
) => {
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem: {
    before: string[];
    lines: string[];
    after: string[];
  }) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = [labels[context.tooltip.dataPoints[0].dataIndex]];
    const bodyLines = tooltipModel.body.map(getBody).slice(0, 2);
    const index = context.tooltip.dataPoints[0].dataIndex;
    const currDate = new Date();
    let currDay = currDate.getDay();
    let currMonth = monthNames[currDate.getMonth()];
    const firstDayEndIndex = labels.indexOf("00");
    const secondDayEndIndex = labels.lastIndexOf("00");
    let day = `${currDay} ${currMonth}`;
    if (index > firstDayEndIndex && index <= secondDayEndIndex) {
      const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      currDay = tomorrowDate.getDay();
      currMonth = monthNames[tomorrowDate.getMonth()];

      day = `${currDay} ${currMonth}`;
    } else if (index > secondDayEndIndex) {
      const tomorrowDate = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000 * 2
      );
      currDay = tomorrowDate.getDay();
      currMonth = monthNames[tomorrowDate.getMonth()];
      day = `${currDay} ${currMonth}`;
    }

    let innerHtml = "<thead>";

    titleLines.forEach((title) => {
      innerHtml += `<tr><th>${day} ${title}:00</th></tr>`;
    });
    innerHtml += "</thead><tbody>";

    bodyLines.push([
      `Направление ветра, градусов: ${weatherForecast.properties.timeseries[index].data.instant.details.wind_from_direction}`,
    ]);

    bodyLines.forEach((body, i) => {
      const colors = tooltipModel.labelColors[i];
      let style = `background:${colors?.backgroundColor || "gray"}`;
      style += `; border-color:${colors?.borderColor}`;
      style += "; border-width: 2px";
      const span = `<span style="${style}">${body}</span>`;
      innerHtml += `<tr><td>${span}</td></tr>`;
    });
    innerHtml += "</tbody>";

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot!.innerHTML = innerHtml;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  // const bodyFont = ChartJS;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = "1";
  tooltipEl.style.position = "absolute";
  const currentXPosition =
    position.left + window.scrollX + tooltipModel._eventPosition.x;
  tooltipEl.style.left = `${
    currentXPosition + 150 > window.innerWidth
      ? currentXPosition - 150
      : currentXPosition
  }px`;
  tooltipEl.style.top = `${
    position.top + window.scrollY + tooltipModel._eventPosition.y
  }px`;
  // tooltipEl.style.font = bodyFont.string;
  tooltipEl.style.padding = "10px 10px";
  tooltipEl.style.background = "white";
  tooltipEl.style.borderRadius = "5px";
  tooltipEl.style.boxShadow =
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
  tooltipEl.style.pointerEvents = "none";
};

export { getExternalTooltip, getExternalWindTooltip };
