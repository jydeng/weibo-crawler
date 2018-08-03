const puppeteer = require('puppeteer-cn');
const loginUrl = `https://passport.weibo.cn/signin/login?entry=mweibo`;
const weibourl = `http://weibo.cn/u/3591355593?filter=1&page=1`;
const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(loginUrl, { waitUntil: 'networkidle2' });

  //模拟输入,登录
  await page.$eval('#loginName', ele => {
    ele.value = '529909869@qq.com';
  });
  await page.$eval('#loginPassword', ele => {
    ele.value = 'love89757.wb';
  });
  await page.keyboard.press('Enter');
  //等发微博框出现表示登录成功
  await page.waitFor('.m-text-cut');

  //抓取微博
  let result = [];

  //跳转到指定的微博页
  await page.goto(weibourl, { waitUntil: 'networkidle2' });
  //注入jQuery
  await page.addScriptTag({
    url: 'https://cdn.bootcss.com/jquery/1.3.0/jquery.min.js'
  });
  //等待页面加载完毕
  await page.waitFor('[name="mp"]');
  //获取总页数
  const totalPage = await page.$eval('[name="mp"]', ele => {
    return ele.value;
  });

  //获取页面中的数据
  let pageData = await page.evaluate(() => {
    let $ = window.$;
    let weibos = [];
    $('.c[id]').each((index, item) => {
      let $item = $(item);
      weibos.push({
        content: $item.find('.ctt').text(),
        time: $item.find('.ct').text(),
        url: $item.find('.cc').attr('href')
      });
    });
    return weibos;
  });

  result = result.concat(pageData);

  for (let index = 2; index < totalPage; index++) {
    sleep(2000);
    let url = `http://weibo.cn/u/3591355593?filter=1&page=${index}`;
    //跳转到指定的微博页
    await page.goto(url, { waitUntil: 'networkidle2' });
    //注入jQuery
    await page.addScriptTag({
      url: 'https://cdn.bootcss.com/jquery/1.3.0/jquery.min.js'
    });
    //等待页面加载完毕
    await page.waitFor('[name="mp"]');
    //获取页面中的数据
    let pageData = await page.evaluate(() => {
      let $ = window.$;
      let weibos = [];
      $('.c[id]').each((index, item) => {
        let $item = $(item);
        weibos.push({
          content: $item.find('.ctt').text(),
          time: $item.find('.ct').text(),
          url: $item.find('.cc').attr('href')
        });
      });
      return weibos;
    });
    result = result.concat(pageData);
  }

  browser.close();
})();
