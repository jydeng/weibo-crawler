const {
  selectSubscribe,
  addSubscribe,
  updateSubscribe
} = require('./subscribe');

const allSubscribe = selectSubscribe();
console.log(allSubscribe);
