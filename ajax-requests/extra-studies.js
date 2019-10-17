/*
let formFields = d.forms;
let formFields2 = d.getElementsByTagName('form')[0];
let formFields3 = d.forms.search;
let formFields4 = d.forms['search'];
let max = formFields.length;

cl(formFields[0], 'First form field');
cl(formFields2, 'First form field');
cl(formFields3, 'First form field');
cl(formFields4, 'First form field');

// ------------------------- //

let inputField = d.forms[0];
cl(inputField, 'Input field');

let sbmitButton = d.forms.submitButton;

inputField.value = "Search here";
inputField.addEventListener('focus', function() {
  if(!inputField.value.length)
    return;

  inputField.value = "";
});

inputField.addEventListener('blur', function() {
  if(inputField.value.length === 0)
    inputField.value = "";

  return;
});
*/
