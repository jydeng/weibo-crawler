const guid = require('guid');
const moment = require('moment');

function getGuid(){
  return guid.raw();
}

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
  guid: getGuid,
  now: now
};
