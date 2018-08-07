const util = require('../utils/util');
const { query } = require('./db');

/**
 * 写入博文
 * @param {string} uid 微博id
 * @param {string} content 正文
 * @param {string}} url 跳转地址
 * @param {date} feedtime 发表时间
 */
async function addFeeds(uid,content,url,feedtime){
  const sql = `INSERT INTO feeds(id,uid,content,url,feed_time) VALUES(?,?,?,?,?);`;
  const values = [util.guid(), uid, content, url, feedtime];
  return await query(sql,values);
}

/**
 * 查询博文
 * @param {string}} uid 微博id
 */
async function selectFeeds(uid){
  const sql = `SELECT id,uid,content,url,date_format(feed_time,'%Y-%m-%d %T') feed_time FROM feeds where uid=?`;
  const values = [uid];
  return await query(sql,values);
}

module.exports = {
  addFeeds: addFeeds,
  selectFeeds: selectFeeds
};