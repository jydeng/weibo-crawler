const guid = require('guid');
const moment = require('moment');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'crawler'
});

// 增加订阅
// const addSubscribeSQL = `INSERT INTO subscribe(id,uid,last_crawle_time,deleted) VALUES(?,?,?,0)`;
// const addSqlParams = [
//   guid.raw(),
//   '3591355593',
//   moment().format('YYYY-MM-DD HH:mm:ss')
// ];
// connection.connect();
// connection.query(addSubscribeSQL, addSqlParams, (error, results, fields) => {
//   if (error) {
//     throw error;
//   }else{
//     console.log('增加订阅成功!');
//   }
// });

// 更新订阅
const updateSubscribeSQL = `UPDATE subscribe SET last_title=?,last_url=?,last_feed_time=?, last_crawle_time=? WHERE uid=?`;
const updateSubscribeParams = ['111','111',moment().format('YYYY-MM-DD HH:mm:ss'),moment().format('YYYY-MM-DD HH:mm:ss'),'3591355593'];
connection.connect();
connection.query(updateSubscribeSQL, updateSubscribeParams, (error, result) => {
  if (error) {
    throw error;
  }else{
    console.log('更新订阅成功!');
    console.log(result);
  }
});

// 查询订阅
// const selectSubscribeSQL = `SELECT id,uid,last_title,last_url,date_format(last_feed_time,'%Y-%m-%d %T'),date_format(last_crawle_time,'%Y-%m-%d %T') last_crawle_time FROM subscribe where deleted = 0`;
// connection.connect();
// connection.query(selectSubscribeSQL,(error, results, fields)=>{
//   if(error){
//     throw error;
//   }else{
//     console.log(results);
//   }
// });

// 写入feeds
// const addFeeds = 


connection.end();
