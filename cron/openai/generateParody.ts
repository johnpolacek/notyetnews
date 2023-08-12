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
  console.log('response received')
  console.log({response});
  // const json = await response.json()
  // let argumentsString, dataString
  // console.log('loaded json')
  // try {
  //   argumentsString = json.choices[0].message.function_call.arguments;
  //   dataString = argumentsString.replace(/\\n/g, '').replace(/\\r/g, '').replace(/\n/g, '').replace(/\r/g, '');
  //   // const dataString:string = argumentsString.replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\r/g, '\r');
  //   // const dataString:string = argumentsString.replace(/"(.*?)"/gs, (match: string, group1: string) => {
  //   //   return '"' + group1.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
  //   // });
  //   console.log('parsing data...')
  //   const data = JSON.parse(dataString)
  //   console.log('data parsed!')
  //   return data
  // } catch (error) {
  //   console.error('Failed to parse JSON', error, {argumentsString, dataString});
  //   return error
  // }

}