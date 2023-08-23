const fetchPoints: () => Promise<Point[]> = async () => {
  const urlToFetch = `/api/points`;

  const res = await fetch(urlToFetch);
  const data = await res.json();

  return data;
};

export default fetchPoints;
