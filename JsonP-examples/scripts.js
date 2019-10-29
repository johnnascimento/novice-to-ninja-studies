let send = document.getElementById("send");
send.addEventListener("click", update , false);


function update() {
  var script = document.createElement("script");
  script.src = "https://echo.jsontest.com/name/superman/?callback=process";
  document.getElementsByTagName('head')[0].appendChild(script);
}

function process(response) {
  document.getElementById("output").innerHTML = response.name;
}


// Recursive function test
function counter(currentValue=0, limiterValue=5) {
  console.log('limiter ', limiterValue);
  console.log('Current value ', currentValue);
  
  if(currentValue === limiterValue) {
    console.log('Recursive function created and executed, successfully!');
    return;
  }
  currentValue++;
  counter(currentValue, limiterValue);
}

counter();

function revertedString(string, currentString=0, reverted=[]) {
  if(currentString <= string.length) {
    reverted.unshift(string[currentString]);
    console.log(reverted);
  } else {
    return reverted;
  }
  currentString++;
  revertedString(string, currentString, reverted);
}

revertedString('bola');
