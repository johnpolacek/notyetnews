import { Configuration, OpenAIApi } from "openai";
import { config } from 'dotenv';
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateParody(article: string) {

  console.log('generateParody for '+article)

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `Generate a speculative satirical article in the style of The New York Times set 100 years into the future on the theme from this article from today's news: "${article}". Factor in how drastically different the world would be in 100 years. Create new personas and identities for people in this speculative vision of the future based on the news of today and how things will change in 100 years.`
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
  try {
    const argumentsString = response.data.choices[0].message?.function_call?.arguments;
    if (argumentsString) {
      const dataString = argumentsString.replace(/\\n/g, '').replace(/\\r/g, '').replace(/\n/g, '').replace(/\r/g, '');
      console.log('parsing data...')
      const data = JSON.parse(dataString)
      console.log('data parsed!')
      return data
    } else {
      console.error('Failed to parse JSON', {response});
      return new Error('Failed to parse JSON')
    }
  } catch (error) {
    console.error('Failed to parse JSON', error);
    return error
  }
}