
let timeTo = prompt('Input a date in next format \"year, month, day, hours, minutes, seconds\" for example: 2023, 12, 31, 23, 59,59');
const finishDate = timeTo.split(',').map(el => +(el.trim()));

if ((Date.now() - new Date(...finishDate)) >= 0 ){
  console.log(Date.now, new Date(...finishDate));
  alert('Date is in the Past');
  location.reload();
}

const clockPairs = document.querySelectorAll('.clock-pairs')
const clock = document.querySelector('.clock');
const restart = clock.querySelector('.btn-restart');
const container = document.querySelector('.container');
const days = document.getElementById('days');
const middle = document.createElement('div');
const invLeft =  days.querySelector('.invisible-left');
const invRight = days.querySelector('.invisible-right');
middle.classList.add('invisible-middle');

function restTimeTo(finTime = [2022,12,19,00,00,00]) {
    let date = new Date();
    let diff = Math.floor((new Date(...finTime) - date)/1000);
    if (diff <= 0) {
      clearInterval(start);
      return;
    }
    let days = Math.floor(diff/(3600*24));
    let h = Math.floor((diff-3600*24*days)/3600);
    let m = Math.floor((diff-3600*24*days - h*3600)/60);
    let s = Math.floor(diff -3600*24*days - h*3600 - m*60);
    let text = [days, h, m, s].map(el => {
      return  el < 10 ? '0'+ el.toString() : el.toString();
    });
    return text;
}

function start(ar) {  
  setInterval(() => {
    let text = restTimeTo(ar);
    if (parseInt(text[0]) > 99) {
      daysMore100();
    } else if (text[0] == 99) {
      daysLess100();
    }
    clockPairs.forEach((div,i) => {
      div.prepend(text[i]);
    });
  }, 1000); 
  return clearInterval(start);
};  

function daysMore100() {
  clock.style.width="21em";
  days.style.width ="3em";
  invLeft.append(middle);
  invLeft.style.width = "32%";
  invRight.style.width = "32%";  
}

function daysLess100() {
  clock.style.width="20em";
  days.style.width ="2em";
  middle.remove();
  invLeft.style.width = "49%";
  invRight.style.width = "49%"; 
}

function restartHandler(e) {
  e.preventDefault();
  clearInterval(start);
  location.reload();
}
restart.addEventListener('click', restartHandler);

window.onload = start(finishDate);