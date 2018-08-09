const util = require('../utils/util');
const { query } = require('./db');

/**
 * 新增订阅
 * @param {string} uid 微博id
 */
async function addSubscribe(uid) {
  try {
    const sql = `INSERT INTO subscribe(uid,last_crawle_time,deleted) VALUES(?,?,?,0);`;
    const values = [util.guid(), uid, util.now()];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return false;
  }
}

/**
 * 更新订阅
 * @param {string} uid 微博id
 * @param {string} title 标题
 * @param {string} uname 昵称
 * @param {string} url 跳转地址
 * @param {date} feedtime 发表时间
 */
async function updateSubscribe(uid, uname, title, url, feedtime) {
  try {
    const sql = `UPDATE subscribe SET uname=?,last_title=?,last_url=?,last_feed_time=?, last_crawle_time=? WHERE uid=?;`;
    const values = [uname, title, url, feedtime, util.now(), uid];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return [];
  }
}

/**
 * 查询订阅
 */
async function selectSubscribe() {
  try {
    const sql = `SELECT uid,uname,last_title,last_url,date_format(last_feed_time,'%Y-%m-%d %T') last_feed_time ,date_format(last_crawle_time,'%Y-%m-%d %T') last_crawle_time FROM subscribe where deleted = 0 order by last_crawle_time;`;
    const values = [];
    return await query(sql, values);
  } catch (error) {
    util.log(error.toString(), 'error');
    return [];
  }
}

module.exports = {
  addSubscribe: addSubscribe,
  updateSubscribe: updateSubscribe,
  selectSubscribe: selectSubscribe
};
