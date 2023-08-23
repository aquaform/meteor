const getPointIndicators = (point: Point) => {
  const indicators: string[] = [];
  point.current_values?.forEach((indicator) => indicators.push(indicator.name));

  return indicators;
};

const createNewWidget = (
  pointId: number,
  chartType: "line",
  indicators: string[],
  name: string,
  customIndicators: CustomIndicator[]
) => ({
  pointId,
  chartType,
  indicators,
  name,
  customIndicators,
});

export { getPointIndicators, createNewWidget };
