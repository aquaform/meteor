const parseData = (data: DataPointHistory, indicatorsCount: number) => {
  const parsedData = [];

  if (!data.data.length) return parsedData;

  // TODO: https://eslint.org/docs/latest/rules/no-plusplus
  // allowForLoopAfter...

  for (let i = 0; i < Math.floor(data.data.length / indicatorsCount); i += 1) {
    const timeMeasurement = {} as { [key: string]: string | number };
    const measurementDate = new Date(data.data[indicatorsCount * i].time);
    timeMeasurement["Время"] = `${String(measurementDate.getDate()).padStart(
      2,
      "0"
    )}.${String(measurementDate.getMonth()).padStart(
      2,
      "0"
    )}.${measurementDate.getFullYear()} ${String(
      measurementDate.getHours()
    ).padStart(2, "0")}:${String(measurementDate.getMinutes()).padStart(
      2,
      "0"
    )}`;

    for (let j = 0; j < indicatorsCount; j += 1) {
      const currentElement = data.data[i * indicatorsCount + j];
      timeMeasurement[currentElement?.name] = currentElement?.value || "-";
    }

    parsedData.push(timeMeasurement);
  }

  return parsedData;
};

export default parseData;
