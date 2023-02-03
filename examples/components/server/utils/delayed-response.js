var MIN = 100;
var MAX = 1000;

module.exports = function (res, data) {
  var delay = Math.random() * (MAX - MIN) + MIN;

  setTimeout(function () {
    res.send(data);
  }, delay);
};
