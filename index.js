const util = require('./utils/util');
const subscribe = require('./models/subscribe');
const feeds = require('./models/feeds');
const { crawleWeibo } = require('./crawler/crawler');

(async () => {
  const allSubscribe = await subscribe.selectSubscribe(); 
  const result = await crawleWeibo(allSubscribe);
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    if(item.result.length){
      await subscribe.updateSubscribe(item.uid,item.last_title,item.last_url,item.last_feed_time);
      for (let j = 0; j < item.result.length; j++) {
        const feed = item.result[j];
        await feeds.addFeeds(item.uid,feed.content,feed.url,feed.feedtime);
      }
    }
  }
})();
