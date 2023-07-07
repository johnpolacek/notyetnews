import { NextResponse } from 'next/server'

export async function GET() {
  const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + process.env.NYT_API_KEY;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // 'API-Key': process.env.DATA_API_KEY,
      },
    })
    const data = await res.json()
    return NextResponse.json({ data })

  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message });
  }

}
