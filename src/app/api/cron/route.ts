import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    fetch(`https://${process.env.VERCEL_APP_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        init: process.env.CRON
      })
    })
    .catch((error) => {
      console.error('Error calling generate:', error.message);
    });

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    return NextResponse.error();
  }
}
