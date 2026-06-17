(function () {
  "use strict";

  var is24h = false;

  var timeEl = document.getElementById("time");
  var periodEl = document.getElementById("period");
  var dateEl = document.getElementById("date");
  var toggleBtn = document.getElementById("toggle");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    if (is24h) {
      timeEl.textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
      periodEl.textContent = "";
    } else {
      var period = hours >= 12 ? "PM" : "AM";
      var h12 = hours % 12 || 12;
      timeEl.textContent = pad(h12) + ":" + pad(minutes) + ":" + pad(seconds);
      periodEl.textContent = period;
    }

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    dateEl.textContent = now.toLocaleDateString(undefined, options);
  }

  toggleBtn.addEventListener("click", function () {
    is24h = !is24h;
    toggleBtn.textContent = is24h ? "Switch to 12H" : "Switch to 24H";
    updateClock();
  });

  updateClock();
  setInterval(updateClock, 1000);
})();
