const util = require('./utils/util');
const subscribe = require('./models/subscribe');
const feeds = require('./models/feeds');
const { crawleWeibo } = require('./crawler/crawler');
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.minute = 40;

const job = schedule.scheduleJob(rule,main);

async function main() {
  console.log(`**** ${util.now()}.开始执行爬虫任务。 ****`);

  const allSubscribe = await subscribe.selectSubscribe();
  console.log(`**** ${util.now()}.查询订阅情况:${allSubscribe.length}个订阅。****`);

  console.log(`**** ${util.now()}.开始爬取数据。****`);

  const result = await crawleWeibo(allSubscribe);
  console.log(`**** ${util.now()}.爬取数据完成。****`);

  console.log(`**** ${util.now()}.开始写入数据。****`);
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    if (item.rows.length) {
      console.log(`**** ${util.now()}.${item.uid}微博有更新，写入新微博${item.rows.length}条。****`);
      await subscribe.updateSubscribe(
        item.uid,
        item.last_title,
        item.last_url,
        item.last_feed_time
      );
      for (let j = 0; j < item.rows.length; j++) {
        const feed = item.rows[j];
        await feeds.addFeeds(item.uid, feed.content, feed.url, feed.feedtime);
      }
    }else{
      console.log(`**** ${util.now()}.${item.uid}微博没有更新。****`);
    }
  }
  console.log(`**** ${util.now()}.任务执行完毕。****`);
}


