export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const countPerPage = searchParams.get("count_per_page");
  const page = searchParams.get("page");
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const indicators = searchParams.get("indicators");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/points/${
      params.slug
    }?count_per_page=${countPerPage}&page=${page}&${
      startDate ? `start_date=${startDate}&` : ""
    }${endDate ? `end_date=${endDate}&` : ""}${
      indicators && JSON.parse(indicators).length
        ? `indicators=${indicators}`
        : ""
    }`
  );

  return res;
}
