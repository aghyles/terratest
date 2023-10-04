export async function GET() {
  const res = await fetch('http://127.0.0.1:1337/api/audits?populate=*', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY || '',
    },
  });

  const data = await res.json();

  return Response.json({ data });
}
