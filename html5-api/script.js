console.log('HTML5 API script testing');

function storeStuff() {
if(window.localStorage) {
  localStorage.setItem('name', 'Name of a ball');
  console.log('localStorage.name', localStorage.getItem('name'));
  console.log(localStorage);
  
  localStorage.bola = 'Bola';
  console.log(localStorage.bola);
  
  localStorage.setItem('bola', 'Another ball');
  console.log(localStorage.bola);
  
  localStorage.setItem('myNewEntry', 'event listener testimg time');
  console.log(localStorage.getItem('myNewEntry'));
}
}

function updateStorage() {
  if(window.localStorage) {
    console.log('Name before ', localStorage.getItem('name'));
    
    localStorage.name = 'John';
    console.log('Name after', localStorage.getItem('name'));
    
    localStorage.removeItem('bola');
    localStorage.setItem('myNewEntry', 'Some changes');
    
    console.log(localStorage.getItem('myNewEntry'));
  }
}

addEventListener('storage', function(event) {
  console.log(`The ${event.key} was updated from ${event.oldValue} to ${event.newValue} and has been saved at ${event.storageArea}`, false);
});

setTimeout(storeStuff, 1500);
setTimeout(updateStorage, 3500);