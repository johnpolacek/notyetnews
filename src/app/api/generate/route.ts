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

export async function POST(req: Request) {

  const { init } = await req.json()

  if (init === process.env.CRON) {

    const referer = req.headers.get('Referer');
    // if (!referer || !process.env.VERCEL_APP_URL || !referer.includes(process.env.VERCEL_APP_URL)) {
    if (!referer || !process.env.VERCEL_APP_URL) {
      return NextResponse.json({ message: 'Unauthorized request origin' });
    }

    const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + process.env.NYT_API_KEY;

    // Fetch top stories from NYT API
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Fetched ${data.results.length} results from api.nytimes.com`)

    // Process each article
    const newArticles = [];
    for (const article of data.results) {
      // Generate parody content
      let newArticle:ArticleData
      let imageDescription:String

      try {
        const articleData = await generateParody(article.title + ' - ' + article.abstract);
        newArticle = {
          title: articleData.title,
          abstract: articleData.abstract,
          content: '', // articleData.content,
          imageUrl: ''
        }
        imageDescription = articleData.imageDescription
      } catch (error) {
        return null
      }

      // Generate image
      // try {
      //   const generatedImageUrl = await generateImage(imageDescription);
      //   newArticle.imageUrl = await transferImageToS3(generatedImageUrl, 'notyetnews-'+Date.now()+'.png')
      // } catch (error) {
      //   console.log('Image generation error')
      // }

      // Add to parody articles
      if (newArticle) {
        console.log('Article #'+(newArticles.length+1)+ ' generation complete.')
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
    const responseS3 = await uploadJSONToS3(json, filename);

    console.log('Uploaded to S3: ', responseS3)

    return NextResponse.json({ message: 'Not Yet News created successfully' });
  } else {
    return NextResponse.json({ message: 'Auth param required to generate' });
  }
}
