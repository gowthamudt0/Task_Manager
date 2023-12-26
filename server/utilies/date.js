function getDate() {
  var date = new Date();
  var newdate = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  date = newdate + "/" + month + "/" + year;
  return date;
}

function time() {
  var data = new Date();
  var hour = data.getHours();
  var min = data.getMinutes();
  var seconds = data.getSeconds();

  data = hour + ":" + min + ":" + seconds;
  return data;
}

function DateAndTime() {
  var detail = getDate() + " " + time();
  return detail;
}

module.exports = DateAndTime;
