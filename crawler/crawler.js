const util = require('../utils/util');
const puppeteer = require('puppeteer-cn');
const weiboAccount = require('../config.json').weiboAccount;

function getPageData() {
  let $ = window.$;
  let pageData = [];

  $('.c[id]').each((index, item) => {
    let $item = $(item);
    let title = $item
      .find('.ctt')
      .text()
      .replace('🖤', '');
    let content = $item
      .find('.ctt')
      .html()
      .replace('🖤', '');
    let feedtime = $item.find('.ct').html();
    let url = $item.find('.cc').attr('href');

    pageData.push({ title, content, feedtime, url });
  });
  return pageData;
}

async function crawleWeibo(subscribe) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(util.loginUrl, { waitUntil: 'networkidle2' });

    //模拟登录
    await page.$eval(
      '#loginName',
      (ele, username) => {
        ele.value = username;
      },
      weiboAccount.username
    );
    await page.$eval(
      '#loginPassword',
      (ele, password) => {
        ele.value = password;
      },
      weiboAccount.password
    );
    await page.keyboard.press('Enter');

    //等发微博框出现表示登录成功
    await page.waitFor('.m-text-cut');

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
      return parseInt(ele.value);
    });

    //获取昵称
    subscribe.uname = await page.title();

    //循环每一页
    page: for (let j = 1; j < totalPage; j++) {
      if (j > 1) {
        //跳转到指定的微博页
        await page.goto(util.url(subscribe.uid, j), {
          waitUntil: 'networkidle2'
        });

        //等待页面加载完毕
        await page.waitFor('[name="mp"]');

        //注入jQuery脚本
        await page.addScriptTag({
          url: 'https://cdn.bootcss.com/jquery/1.3.0/jquery.min.js'
        });
      }

      //获取页面中的数据
      let pageData = await page.evaluate(getPageData);

      //分析数据，判断是否需要加载下一页
      for (let l = 0; l < pageData.length; l++) {
        let item = pageData[l];
        //处理奇奇怪怪的时间
        let feedtime = util.procTime(item.feedtime);
        //若微博发布时间晚于最后抓取时间则需要入库，
        if (util.after(feedtime, subscribe.last_crawle_time)) {
          item.feedtime = feedtime;
          subscribe.last_title = item.title;
          subscribe.last_url = item.url;
          subscribe.last_feed_time = subscribe.last_feed_time
            ? util.after(item.feedtime, subscribe.last_feed_time)
              ? item.feedtime
              : subscribe.last_feed_time
            : item.feedtime;
          subscribe.rows.push(item);
        } else {
          //抓取到的数据是按照时间逆序，遇到一条不符合条件则后续的均不符合,直接跳出循环
          break page;
        }
      }
    }
  } catch (error) {
    util.log(error.toString(), 'error');
    return subscribe;
  }

  await page.close();
  await browser.close();

  return subscribe;
}

module.exports = {
  crawleWeibo: crawleWeibo
};
