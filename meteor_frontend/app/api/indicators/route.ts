export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/indicators`
  );

  return res;
}
