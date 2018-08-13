const guid = require('guid');
const moment = require('moment');
const logger = require('../logger');
const infologger = logger.logger('default');
const errlogger = logger.logger('error');

function getGuid() {
  return guid.raw();
}

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function url(uid, page) {
  if (/^\d*$/.test(uid)) {
    return `https://weibo.cn/u/${uid}?filter=1&page=${page}`;
  } else {
    return `https://weibo.cn/${uid}?filter=1&page=${page}`;
  }
}

function sleep(time) {
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function procTime(str) {
  if (str === '') {
    return now();
  }

  let pure = str.replace(/[ ]|[&nbsp;]/g, ' ');
  let arr = pure.split(' ');
  let currentDay = ~pure.indexOf('今天');
  let currentYear = ~pure.indexOf('月') && ~pure.indexOf('日');
  let latelyReg = /^(\d{1,2})\D*$/;
  let lately = latelyReg.test(arr[0]);

  if (currentDay) {
    return `${moment().format('YYYY-MM-DD')} ${arr[1]}:00`;
  }

  if (currentYear) {
    return `${moment().year()}-${arr[0].replace('月', '-').replace('日', '')} ${
      arr[1]
    }:00`;
  }

  if (lately) {
    return moment()
      .subtract(latelyReg.exec(arr[0])[1], 'minute')
      .format('YYYY-MM-DD HH:mm:ss');
  }

  return `${arr[0]} ${arr[1]}`;
}

function after(a, b) {
  return moment(a, 'YYYY-MM-DD HH:mm:ss').isAfter(b);
}

function log(msg, type = 'debug') {
  switch (type) {
    case 'error':
      errlogger.error(msg);
      break;
    default:
      infologger.info(msg);
      break;
  }
}

module.exports = {
  sleep: sleep,
  guid: getGuid,
  now: now,
  url: url,
  loginUrl: 'https://passport.weibo.cn/signin/login?entry=mweibo',
  procTime: procTime,
  after: after,
  log: log
};
