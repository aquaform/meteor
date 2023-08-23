/* eslint-disable import/prefer-default-export */
export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/points`,
    {
      next: {
        // TODO: That basically removes caching, not that good
        revalidate: 1,
      },
    }
  );

  return res;
}
