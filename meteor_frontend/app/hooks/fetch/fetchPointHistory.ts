const fetchPointHistory: (options: {
  pageIndex: number;
  pageSize: number;
  selectedPointId: number | null;
  indicatorsCount: number;
  from?: string;
  to?: string;
  indicators?: number[];
}) => Promise<{ tableData: DataPointHistory }> = async ({
  pageIndex,
  pageSize,
  selectedPointId,
  indicatorsCount,
  from,
  to,
  indicators,
}) => {
  const urlToFetch = `/api/points/${selectedPointId ?? 1}?count_per_page=${
    pageSize * indicatorsCount
  }&page=${pageIndex}&${
    indicators && indicators.length ? `indicators=[${String(indicators)}]&` : ""
  }${from ? `&start_date=${from}&` : ""}${to ? `end_date=${to}&` : ""}`;

  const res = await fetch(urlToFetch);
  const data = await res.json();

  return {
    tableData: data,
    meta: {
      pageCount: data.last_page,
      links: data.links,
    },
  };
};

export default fetchPointHistory;
