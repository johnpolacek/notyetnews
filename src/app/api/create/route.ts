import { NextResponse } from 'next/server'
import { generateImage } from '@/app/openai/generateImage';
import { generateParody } from '@/app/openai/generateParody';
import { uploadJSONToS3, transferImageToS3 } from '@/app/aws/s3';

interface ArticleData {
  title: String;
  abstract: String;
  content: String;
  imageUrl: String;
}

export const runtime = 'edge'

export async function GET() {
  try {
    const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + process.env.NYT_API_KEY;
    console.log('create stream')
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        // Fetch top stories from NYT API
        const response = await fetch(url);
        const data = await response.json();
        controller.enqueue(encoder.encode(`Fetched ${data.results.length} results from api.nytimes.com`));
        console.log(`Fetched ${data.results.length} results from api.nytimes.com`)

        // Process each article
        const newArticles = [];
        for (const article of data.results) {
          // Generate parody content
          let newArticle:ArticleData
          let imageDescription:String

          try {
            console.log(`Generate article #${(newArticles.length+1)} ${article.title}`)
            controller.enqueue(encoder.encode(`Generate article #${(newArticles.length+1)} ${article.title}`));
            const articleData = await generateParody(article.title + ' - ' + article.abstract);
            newArticle = {
              title: articleData.title,
              abstract: articleData.abstract,
              content: articleData.content,
              imageUrl: ''
            }
            imageDescription = articleData.imageDescription
          } catch (error) {
            console.log('Error on article generation', error)
            return null
          }

          // Generate image
          try {
            console.log(`Generate image #${(newArticles.length+1)}`)
            controller.enqueue(encoder.encode(`Generate image #${(newArticles.length+1)}`));
            const generatedImageUrl = await generateImage(imageDescription);
            controller.enqueue(encoder.encode(`Image generated. Copy to S3...`));
            newArticle.imageUrl = await transferImageToS3(generatedImageUrl, 'notyetnews-'+Date.now()+'.png')
            controller.enqueue(encoder.encode(`Image url ${newArticle.imageUrl}`));
          } catch (error) {
            console.log('Image generation error')
          }

          // Add to parody articles
          if (newArticle) {
            console.log('Article #'+(newArticles.length+1)+ ' generation complete.')
            controller.enqueue(encoder.encode('Article #'+(newArticles.length+1)+ ' generation complete.'));
            newArticles.push(newArticle)
          }
        }

        // Convert parody articles to JSON string
        const json = JSON.stringify(newArticles);

        // Upload JSON to S3
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Months are 0-based, so we add 1
        const day = ('0' + date.getUTCDate()).slice(-2); // Add leading 0 if needed

        const filename = `notyetnews-${year}-${month}-${day}.json`;
        console.log('uploading json...')
        controller.enqueue(encoder.encode('uploading json'));
        const responseS3 = await uploadJSONToS3(json, filename);
        console.log('Uploaded to S3: '+ responseS3)
        controller.enqueue('Uploaded to S3: '+ responseS3);
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    let message = 'An error occurred';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      message = error.message;
    }
    return NextResponse.json({ message: message }, { status: 500 })
  }

}