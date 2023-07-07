import { Configuration, OpenAIApi } from 'openai-edge'
import { NextResponse } from 'next/server'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { article } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `Generate a news article in the style of The Onion set 100 years into the future on this article from today's news. Factor in how drastically different the world would be in 100 years. This news article might not even be relevant: ${article}`
      }
    ],
    functions: [{
      name: 'print',
      description: 'Prints a news article in json format',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title of the article'
          },
          abstract: {
            type: 'string',
            description: 'Brief description of the article'
          },
          content: {
            type: 'string',
            description: 'Text content of the article'
          },
          imageDescription: {
            type: 'string',
            description: 'A text prompt to provide DALLE so it can generate a main image to go along with the article'
          },
        }
      }
    }]
  })
  const json = await response.json()
  const dataString:string = json.choices[0].message.function_call.arguments.replace(/"(.*?)"/g, (match:string, group:string) => {
    return '"' + group.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
  });
  const data = JSON.parse(dataString)
  return NextResponse.json({ data })
}