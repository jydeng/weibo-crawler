const util = require('../utils/util');
const puppeteer = require('puppeteer-cn');

function getPageData() {
  let $ = window.$;
  let pageData = [];

  $('.c[id]').each((index, item) => {
    let $item = $(item);
    let content = $item.find('.ctt').text();
    let feedtime = $item.find('.ct').html();
    let url = $item.find('.cc').attr('href');

    pageData.push({ content, feedtime, url });
  });
  return pageData;
}

async function crawleWeibo(subscribes) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(util.loginUrl, { waitUntil: 'networkidle2' });

  //模拟登录
  await page.$eval('#loginName', ele => {
    ele.value = '529909869@qq.com';
  });
  await page.$eval('#loginPassword', ele => {
    ele.value = 'love89757.wb';
  });
  await page.keyboard.press('Enter');
  //等发微博框出现表示登录成功
  await page.waitFor('.m-text-cut');

  //循环所有订阅
  for (let i = 0; i < subscribes.length; i++) {
    const subscribe = subscribes[i];
    subscribe.rows = [];

    //跳转到指定的微博页
    await page.goto(util.url(subscribe.uid, 1), { waitUntil: 'networkidle2' });

    //等待页面加载完毕
    await page.waitFor('[name="mp"]');

    //注入jQuery脚本
    await page.addScriptTag({
      url: 'https://cdn.bootcss.com/jquery/1.3.0/jquery.min.js'
    });

    //获取总页数
    const totalPage = await page.$eval('[name="mp"]', ele => {
      return ele.value;
    });

    //循环每一页
    page: for (let j = 1; j < totalPage.length; j++) {

      //获取页面中的数据
      let pageData = await page.evaluate(getPageData);

      //分析数据，判断是否需要加载下一页
      for (let l = 0; l < pageData.length; l++) {
        let item = pageData[l];
        //处理奇奇怪怪的时间
        let feedtime = util.procTime(item.feedtime);
        //若微博发布时间晚于最后抓取时间则需要入库，
        //抓取到的数据是按照时间逆序，遇到一条不符合条件则后续的均不符合
        if (util.after(feedtime, subscribe.last_crawle_time)) {
          item.feedtime = feedtime;
          subscribe.last_title = item.content;
          subscribe.last_url = item.url;
          subscribe.last_feed_time = util.after(item.feedtime,subscribe.last_feed_time) ? item.feedtime : subscribe.last_feed_time;
          subscribe.rows.push(item);
        } else {
          break page;
        }
      }
    }
  }

  await page.close();
  await browser.close();
  
  return subscribes;
}

module.exports = {
  crawleWeibo: crawleWeibo
};
