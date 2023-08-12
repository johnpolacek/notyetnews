import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

export async function generateImage(prompt: String) {
  const apiKey = process.env.OPENAI_API_KEY
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }
  const req = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512"
    }),
  }

  console.log("/api.openai.com/v1/images/generations", req)

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      req
    )

    const result:any = await response.json()

    if (response.ok) {
      console.log('generateImage response ok. result.data[0]:', result.data[0])
      return result.data[0].url
    } else {
      console.log('error', result)
      throw new Error(result.error || "Failed to generate image")
    }
  } catch (error) {
    console.error(JSON.stringify(error))
    throw new Error("Failed to generate image")
  }
}