const util = require('./utils/util');
const subscribe = require('./models/subscribe');
const feeds = require('./models/feeds');
const { crawleWeibo } = require('./crawler/crawler');
const schedule = require('node-schedule');

//间隔5分钟执行一次任务
const job = schedule.scheduleJob('0 */5 * * * *',main);

async function main() {
  util.log(`开始执行爬虫任务。`);

  const allSubscribe = await subscribe.selectSubscribe();
  util.log(`查询订阅情况:${allSubscribe.length}个订阅。`);

  util.log(`开始爬取数据。`);

  const result = await crawleWeibo(allSubscribe);
  util.log(`爬取数据完成。`);

  util.log(`开始写入数据。`);
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    if (item.rows.length) {
      util.log(`uid:[${item.uid}]微博有更新，写入新微博${item.rows.length}条。`);
      await subscribe.updateSubscribe(item.uid,item.last_title,item.last_url,item.last_feed_time);
      for (let j = 0; j < item.rows.length; j++) {
        const feed = item.rows[j];
        await feeds.addFeeds(item.uid, feed.content, feed.url, feed.feedtime);
      }
      util.log(`uid:[${item.uid}]写入完成。`);
    }else{
      util.log(`${item.uid}微博没有更新。`);
    }
  }
  util.log(`任务执行完毕。`);
}

main();


