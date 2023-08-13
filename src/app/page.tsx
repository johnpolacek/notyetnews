import Main from './components/main'
import { NewsArticle } from './types'

async function getNewsArticles() {
  let date = new Date();
  let attempts = 0;
  let maxAttempts = 10;
  let res;

  while (attempts < maxAttempts) {
    const dateString = date.toISOString().split('T')[0];
    res = await fetch(`https://notyetnews.s3.us-east-1.amazonaws.com/notyetnews-${dateString}.json`, { next: { revalidate: 60 } });

    if (res.ok) {
      // Return both the articles and the date
      return { articles: await res.json(), date: dateString };
    }

    // If not successful, set date to the previous day and increment the attempts count
    date.setDate(date.getDate() - 1);
    attempts++;
  }

  throw new Error('Failed to fetch data after 10 attempts');
}

export default async function Home() {
  const { articles, date } = await getNewsArticles();
  return (
    <Main theme="news" slug={date} articles={articles} />
  );
}
