const widget = document.getElementById('news-widget');

// List of RSS feed URLs
const feeds = [
  'https://feeds.bbci.co.uk/news/rss.xml' ,
  'https://www.aljazeera.com/xml/rss/all.xml' 
];

// Function to fetch one RSS feed via rss2json
function fetchFeed(feedUrl) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  return fetch(apiUrl)
    .then(res => res.json())
    .then(data => data.items) // Get all items from each feed
    .catch(err => {
      console.error(`Failed to fetch feed: ${feedUrl}`, err);
      return []; // Return empty list on error
    });
}

// Fetch all feeds
Promise.all(feeds.map(fetchFeed))
  .then(allResults => {
    const allItems = allResults.flat(); // Combine all articles into one array
    
    // Remove duplicates based on article link
    const uniqueItems = [];
    const seenLinks = new Set();
    
    allItems.forEach(item => {
      if (!seenLinks.has(item.link)) {
        seenLinks.add(item.link);
        uniqueItems.push(item);
      }
    });
    
    // Sort by publication date
    uniqueItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    // Ensure we show up to 10 articles
    const displayItems = uniqueItems.slice(0, 5);
    
    // Display articles
    widget.innerHTML = displayItems.map(item => `
      <p><a href="${item.link}" target="_blank">${item.title}</a></p>
    `).join('');
  })
  .catch(error => {
    widget.innerHTML = 'Failed to load news.';
    console.error('Error combining feeds:', error);
  });


  export function initNews() {
    console.log("News ready");
}