// Import your worker code. This is just an example.
// Replace it with the actual require statement for your worker code.
// const { generateImage } = require('./openai/generateImage');
// const { generateParody } = require('./openai/generateImage');
// const { uploadJSONToS3, transferImageToS3 } = require('./aws/s3');

import { generateParody } from "./openai/generateParody.ts"

import { config } from 'dotenv';
config();

const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + process.env.NYT_API_KEY;
const response = await fetch(url);
const data = await response.json();
console.log(`Fetched ${data.results.length} results from api.nytimes.com`)

console.log('Generate parody for: '+data.results[0].title + ' - ' + data.results[0].abstract)
console.log(process.env.OPENAI_API_KEY);
generateParody(data.results[0].title + ' - ' + data.results[0].abstract);
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-4",
//   messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
// });
// console.log(completion.data.choices[0].message);