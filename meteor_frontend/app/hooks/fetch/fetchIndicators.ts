const fetchIndicators: () => Promise<IndicatorData[]> = async () => {
  const urlToFetch = `/api/indicators`;

  const res = await fetch(urlToFetch);
  const data = await res.json();

  return data;
};

export default fetchIndicators;
