import { NextResponse } from 'next/server'
export const runtime = 'edge'

export async function GET(req: Request) {
  console.log('cron5')

  if (process.env.NODE_ENV !== 'development') {
    const referer = req.headers.get('Referer');
    if (!referer || !process.env.VERCEL_APP_URL || !referer.includes(process.env.VERCEL_APP_URL)) {
      return NextResponse.json({ message: 'Unauthorized request origin' }, { status: 403 })
    }
  }

  const appUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://' + process.env.VERCEL_APP_URL;

  try {
    const res = await fetch(`${appUrl}/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        init: process.env.CRON,
      })
    });

    if (!res.ok) {
      console.log('Error in fetch request to /api/create:', res.statusText);
      return NextResponse.json({ message: 'Error in fetch request to /api/create: ' + res.statusText }, { status: res.status });
    }

    console.log('return cron')
    // Return the body directly, it's a readable stream
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


}
