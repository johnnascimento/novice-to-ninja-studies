console.log('My script is running sound!');

let filterContainer = document.querySelector('.filterContainer');
let filterWrapper = document.querySelector('.filterWrapper');
let filterItem = document.querySelector('.filterItem');
let checkboxItemInputs = document.querySelector('input[name=\"checkboxItem\"]');
let outputDiv = document.querySelector('.outputDiv');
let regExForUrl = /(\w\W?)(\*\?)(\w|\W?)/gmi;
let arrayGenerated = [];
/*
console.log(filterContainer);
console.log(filterWrapper);
console.log(filterItem);
console.log(checkboxItemInputs);
console.log(checkboxItemInputs);*/

function removeElementFromArray(urlToRemove, arrayOfElements) {
  console.log('Remove Element From Array was called');
  console.log('urlToRemove ', urlToRemove, ' arrayOfElements ', arrayOfElements);
}

document.body.addEventListener('click', function(ev) {
  console.log(ev.target.classList[0]);
  console.log(ev.target.tagName);
  //console.log(ev.target.value);
  
  if(ev.target.classList.contains('checkboxWrapper')) {
   console.log(ev.target.classList[0]);
   
    let evTargetsChildren = ev.target.childNodes;
    let convertedNodeList = [].slice.call(evTargetsChildren);
    let urlFromItem = convertedNodeList[3].dataset.href;
    let urlIndexFound = urlFromItem.toString().search(regExForUrl) + 1;
    let urlStringCropping = urlFromItem.substring(urlIndexFound, urlFromItem.length);
    
    console.log('+++*+*+*+*+*+*+#+*+*', ev.target.querySelector('input').checked);
    console.log('Regular Expression test', urlIndexFound);
    console.log('String cropped', urlStringCropping);
    if(ev.target.querySelector('input').checked === true) {
      arrayGenerated.push(urlStringCropping);
      console.log('If statement');
    } else {
      removeElementFromArray(urlStringCropping, arrayGenerated);
    }
    console.log('Children nodes here ***** ', evTargetsChildren);
    console.log('Converted Node list here ***** ', urlFromItem);
  
   // outputDiv.innerHTML = outputDiv.innerHTML + " " + urlFromItem + "<br />" + urlStringCropping + "<br />";
    outputDiv.innerHTML = outputDiv.innerHTML + " " + arrayGenerated + " " + arrayGenerated.length + "<br />";
  } else {
    console.log('Nop');
  }
});