const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'crawler'
});
const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        conn.release();
        return reject(err);
      }
      conn.query(sql, values, (err, rows) => {
        if (err) {
          conn.release();
          reject(err);
        } else {
          resolve(rows);
          conn.release();
        }
      });
    });
  });
};

module.exports = {
  query: query
};
