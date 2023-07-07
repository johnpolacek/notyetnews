# NotYet.News

Hourly cron to create json in AWS for news from the future

1 year
1 decade
1 century

funnier
darker
optimistic
other

based on the current news and random shit


Sequence:

1. Get NYTimes Top Content
2. For each article, generate a future news version into JSON
3. Generate an image, copy to S3 put URL into JSON
4. Upload JSON to S3

Homepage loads S3 and outputs the page. Links to previous versions.

