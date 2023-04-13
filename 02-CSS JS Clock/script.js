setInterval(function () {
  setDate();
}, 1000);

setDate();

function setDate() {
  var time = new Date();
  var seconds = time.getSeconds() * 6 + 90;
  var minutes = time.getMinutes() * 6 + 90;
  var hours = time.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  hours = hours * 30 + 90;
  var secNode = document.querySelector(".sec");
  var minNode = document.querySelector(".min");
  var hourNode = document.querySelector(".hour");
  secNode.style.transform = `rotate(${seconds}deg)`;
  minNode.style.transform = `rotate(${minutes}deg)`;
  hourNode.style.transform = `rotate(${hours}deg)`;
  console.log(hours);
}
