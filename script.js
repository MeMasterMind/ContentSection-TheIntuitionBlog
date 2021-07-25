var formattedDateToday = moment().format('YYYY-MM-DD')
var formattedDateYesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")



const yesterdayElement = document.getElementById("yesterdayBPI")
let pred1 = document.getElementById("predictionNO?");
let pred2 = document.getElementById("predictionYES?")

fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + formattedDateYesterday + '&end=' + formattedDateToday)
  .then(results => results.json())
  .then(data => {
    let bpi = data.bpi
    for (var key in bpi) {
      yesterdayElement.innerHTML = "$" + bpi[key]
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(results => results.json())
        .then(data => {
          var yester = bpi[key]
          var currentRate = data.bpi.USD.rate_float
          var time = data.time.updated
          document.getElementById("currentBPI").innerHTML = currentRate
          document.getElementById("time").innerHTML = time

          if (currentRate > yester) {

            pred2.innerHTML = "up";
            pred1.innerHTML = "up";

          }
          else if (yester > currentRate) {
            pred2.innerHTML = "down";
            pred1.innerHTML = "down";
          }


        })

    }

  })
function check(num) {
  return isNaN(Number(num)) ? num : Number(num);
}
document.getElementById("up").addEventListener("click", validateup)
document.getElementById("down").addEventListener("click", validatedown)

let incElement = document.getElementById("inc")
let cElement = document.getElementById("c")


function validateup() {

  if (pred1.innerHTML === "up") {
    answerIsCorrect()
    cElement.scrollIntoView();
  }
  else if (pred1.innerHTML === "down") {
    answerIsIncorrect()
    incElement.scrollIntoView();
  }
}



function validatedown() {

  if (pred1.innerHTML === "up") {
    answerIsIncorrect()
    incElement.scrollIntoView();
  }
  else if (pred1.innerHTML === "down") {
    answerIsCorrect()
    cElement.scrollIntoView();

  }

}
var currentBPI = document.getElementById("currentBPI")
var timeElement = document.getElementById("time")
function answerIsCorrect() {
  Swal.fire({
    icon: "success",
    title: "<span color:'#fff'>Good Intuition!</span>",
    html: 'It went to <b>$' + currentBPI.innerHTML + '</b>' + '<Br> at ' + timeElement.innerHTML,

  })
}

function answerIsIncorrect() {
  Swal.fire({
    title: "Try again!",
    html: 'It went to <b>$' + currentBPI.innerHTML + '</b>' + '<Br> at ' + timeElement.innerHTML,

  })
}

//Random Image Generator
var i = 0;
function showImg() {
  var collections = ["89287309", "47454235", "3330452", "3410937", "8253641"]
var randomID = collections[Math.floor(Math.random() * collections.length)]
var unsplashLink = "https://source.unsplash.com/collection/" + randomID +"/"+i
var imgHtml = '<img style="width:auto; height:300px;"src="'+unsplashLink+'" />'
Swal.fire({
  title: "Title",
  html: imgHtml,
 })

}
