// Import your worker code. This is just an example.
// Replace it with the actual require statement for your worker code.
const { generateImage } = require('./openai/generateImage');
const { generateParody } = require('./openai/generateImage');
const { uploadJSONToS3, transferImageToS3 } = require('./aws/s3');

const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + process.env.NYT_API_KEY;
console.log('create stream')
const encoder = new TextEncoder();
const readable = new ReadableStream({
  async start(controller) {
    // Fetch top stories from NYT API
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Fetched ${data.results.length} results from api.nytimes.com`)

    // // Process each article
    // const newArticles = [];
    // for (const article of data.results) {
    //   // Generate parody content
    //   let newArticle
    //   let imageDescription

    //   try {
    //     console.log(`Generate article #${(newArticles.length+1)} ${article.title}`)
    //     const articleData = await generateParody(article.title + ' - ' + article.abstract);
    //     newArticle = {
    //       title: articleData.title,
    //       abstract: articleData.abstract,
    //       content: articleData.content,
    //       imageUrl: ''
    //     }
    //     imageDescription = articleData.imageDescription
    //   } catch (error) {
    //     console.log('Error on article generation', error)
    //     return null
    //   }

    //   // Generate image
    //   try {
    //     console.log(`Generate image #${(newArticles.length+1)}`)
    //     const generatedImageUrl = await generateImage(imageDescription);
    //     newArticle.imageUrl = await transferImageToS3(generatedImageUrl, 'notyetnews-'+Date.now()+'.png')
    //   } catch (error) {
    //     console.log('Image generation error')
    //   }

    //   // Add to parody articles
    //   if (newArticle) {
    //     console.log('Article #'+(newArticles.length+1)+ ' generation complete.')
    //     newArticles.push(newArticle)
    //   }
    // }

    // // Convert parody articles to JSON string
    // const json = JSON.stringify(newArticles);

    // // Upload JSON to S3
    // const date = new Date();
    // const year = date.getUTCFullYear();
    // const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Months are 0-based, so we add 1
    // const day = ('0' + date.getUTCDate()).slice(-2); // Add leading 0 if needed

    // const filename = `notyetnews-${year}-${month}-${day}.json`;
    // console.log('uploading json...')

    // const responseS3 = await uploadJSONToS3(json, filename);
    // console.log('Uploaded to S3: '+ responseS3)
  },
});