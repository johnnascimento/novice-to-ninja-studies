const cl = (elem, text) => {
  if(elem === null || elem === undefined) {
    return function(text) {
      return  console.log('%c '+text, 'font-size: 16px; font-weight: 700; color: coral;');
    };
  } else {
    return console.log('%c '+text, 'font-size: 16px; font-weight: 700; color: lightblue;', elem);
  }
};

cl('************************');
cl('The Ajax environment is up and running Baby');
cl('************************');

const d = document;
const b = d.body;
const w = window;

class HeroeForm {
  constructor($form) {
    this.form = $form;
    cl('heroeFormVar', $form);
  }

  focusOnFirstInput() {
    this.form.heroeName.focus();
  }

  storeValueFromForm() {
    cl('The form was submitted and storeValueFromForm() method called');

    this.dataStringified;
    this.storedValue = {};
    this.inputFields = this.form.children;
    this.inputCheckboxFields = this.form.powers;

    this.inputCheckboxesArrayLength = this.inputCheckboxFields.length - 1;
    this.inputRadioBtns = this.form.radioType;
    this.inputRadioBtnsLength = this.inputRadioBtns.length - 1;

    this.storedValue.herosName = this.inputFields[0].value;
    this.storedValue.heroesPower = this.inputFields[1].value;
    this.storedValue.heroesRealName = this.inputFields[2].value;
    this.storedValue.heroesCity = (this.inputFields.city.value === '') ? 'City unknown' : this.inputFields.city.value;

    this.storedValue.checkboxArray = [];
    this.storedValue.radioBtns = [];

    for(let i = 0; i <= this.inputCheckboxesArrayLength; i++) {
      cl('***** i value ****', i);
      if(this.inputCheckboxFields[i].name === 'powers' && this.inputCheckboxFields[i].checked === true) {
          this.storedValue.checkboxArray.push(this.inputCheckboxFields[i].value);
      }
    }

    for(let j = 0; j <= this.inputRadioBtnsLength; j++) {
      if(this.inputRadioBtns[j].checked === true) {
        this.storedValue.radioBtns.push(this.inputRadioBtns[j].value);
      }
    }

    this.dataStringified = JSON.stringify(this.storedValue);
    return this.dataStringified;
  }

  sendInfoThrough(data) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://reqres.in/api/users', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 201) {
        cl('Ajax response simulated: ', xhr.responseText);
      } else {
        cl('Didn\'t work! Good try though');
      }
    };
    xhr.send(data);
  }

  submitHero(elem) {
    cl('SubmiHeroe was invoked');
    
    let form = elem;
    let data = new FormData(form);
    cl('FormData() constructor function', data);
    cl('First elem in FormData: ', elem.length);
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://reqres.in/api/users', true);
    xhr.setRequestHeader('Content-type', 'application/json', 'Access-Control-Allow-Origin');
    
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 201) {
        cl('Ajax response simulated: ', xhr.responseText);
      } else {
        cl('Didn\'t work! Good try though');
      }
    };
    xhr.timeout = 5000;
    xhr.ontimeout = () => {
      cl('You\'re requst\'s waiting time has run out ', xhr.responseText);
    };
    
    xhr.send(data);
    alert('DATA IS: ', data);
  }

  bindEvents() {
    cl('submit button ', this.form.submitButton );
    let _self = this;
    //this.form.submitButton.addEventListener('click', function(){
     // let stringifiedData = this.storeValueFromForm();
     // cl('stringifiedData', stringifiedData);

    //  this.sendInfoThrough(stringifiedData);
    //}.bind(this), false);
    this.form.submitButton.addEventListener('click', function() {
        _self.submitHero(_self.form);
    }, false);
  }

  init() {
    this.focusOnFirstInput();
    this.bindEvents();
  }
}

// Variables and instance creation
let $heroeForm = d.forms.superHeroeForm;
let $heroFormGById = d.getElementById('superHeroesForm');
//let heoreFormInstance = new HeroeForm($heroeForm);

let heoreFormInstance = new HeroeForm($heroFormGById);

heoreFormInstance.init();