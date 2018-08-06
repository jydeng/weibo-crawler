const util = require('./util');
const mysql = require('./db');

/**
 * 新增订阅
 * @param {string} uid 微博id
 */
async function addSubscribe(uid) {
  const sql = `INSERT INTO subscribe(id,uid,last_crawle_time,deleted) VALUES(?,?,?,0);`;
  const values = [util.guid(), uid, util.now()];
  return await mysql.query(sql,values);
}

/**
 * 更新订阅
 * @param {string} uid 微博id
 * @param {string} title 标题
 * @param {string} url 跳转地址
 * @param {date} feedtime 发表时间
 */
async function updateSubscribe(uid, title, url, feedtime) {
  const sql = `UPDATE subscribe SET last_title=?,last_url=?,last_feed_time=?, last_crawle_time=? WHERE uid=?;`;
  const values = [title, url, feedtime, utl.now(), uid];
  return await mysql.query(sql,values);
}

/**
 * 查询订阅
 */
async function selectSubscribe() {
  const sql = `SELECT id,uid,last_title,last_url,date_format(last_feed_time,'%Y-%m-%d %T') last_feed_time ,date_format(last_crawle_time,'%Y-%m-%d %T') last_crawle_time FROM subscribe where deleted = 0;`;
  const values = [];
  return await mysql.query(sql,values);
}

module.exports = {
  addSubscribe: addSubscribe,
  updateSubscribe: updateSubscribe,
  selectSubscribe: selectSubscribe
};
