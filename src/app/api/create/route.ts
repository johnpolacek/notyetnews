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

export async function POST(req: Request) {

  console.log('process.env.AWS_S3_BUCKET_NAME '+ process.env.AWS_S3_BUCKET_NAME)

  const { init } = await req.json()

  if (init) {
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
          content: articleData.content,
          imageUrl: ''
        }
        imageDescription = articleData.imageDescription
      } catch (error) {
        return null
      }

      // Generate image
      try {
        const generatedImageUrl = await generateImage(imageDescription);
        newArticle.imageUrl = await transferImageToS3(generatedImageUrl, 'notyetnews-'+Date.now()+'.png')
      } catch (error) {
        console.log('Image generation error')
      }

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
    console.log('uploading json...', json)
    await uploadJSONToS3(json, filename);

    return NextResponse.json({ message: 'Not Yet News created successfully' });
  } else {
    return NextResponse.json({ message: 'Not Yet News param required to generate' });
  }
}
