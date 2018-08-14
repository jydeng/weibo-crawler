# weibo-crawler
微博爬虫,爬取订阅的微博账号博文,分析记录

# 使用
- 配置mysql数据库,建库,建表
- 安装依赖,配置config.json抓取间隔等信息
- 启动项目

## 运行

克隆
```
  git clone https://github.com/jydeng/weibo-crawler.git;
```

安装依赖

```
  npm install;
```

编辑config.json
```
{
  "connection": {
    "host": "mysql ip",
    "port": "mysql 端口号",
    "user": "mysql 用户名",
    "password": "mysql 密码",
    "database": "mysql 数据库名"
  },
  "weiboAccount": {
    "username": "微博账号",
    "password": "微博账号密码"
  },
  "interval": "0 */10 * * * *",
  "intervalDesc": "间隔10分钟执行一次任务"
}
```

启动项目

```
  npm start;
```

## 说明

1. 项目使用了puppeteer抓取微博博文,puppeteer需要chromeium,若本机已安装了chrome,可用以下命令跳过
```
  set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
```
2. 实际入库的时候发现,微博博文有大量的emoji表情,会导致mysql入库失败,此时需要更改一下mysql的编码即可

3. db部分实现较为简单,大量数据入库未有启用事务处理,若数据量较大此处需要改进

4. 爬虫部分实现每次启动一个页面抓取,实际上可以启动多个页面，并行抓取,效率应该会有显著提升,此处可以继续优化

5. 当前爬取的是 "weibo.cn" 下的博文,显示效果没有触屏版好,触屏版采用了滚动加载机制,处理难度比较高,待续...


