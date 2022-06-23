const emailInput = document.querySelector('#email-input');
const emailInputValue = document.querySelector('#email-input').value;
const errorMessage = document.querySelector('#error-message');
const inputForm = document.querySelector('#email-form');

function logSubmit(event) {

    if(emailInputValue.length == 0) {
      emailInput.style.border = "1px solid hsl(354, 100%, 66%)";
      errorMessage.style.display = 'block';
      event.preventDefault();
    }
    else if(!emailInputValue.includes('@')) {
      emailInput.style.border = "1px solid hsl(354, 100%, 66%)";
      errorMessage.style.display = 'block';
      event.preventDefault();
    }
    else if(!emailInputValue.includes('.')) {
      emailInput.style.border = "1px solid hsl(354, 100%, 66%)";
      errorMessage.style.display = 'block';
      event.preventDefault();
    }
  }

  function resetFocusEmailForm(event) {
    if(!inputForm.contains(event.target)) {
      emailInput.style.border = '1px solid hsl(227, 51%, 93%)';
      errorMessage.style.display = 'none';
    }
  }
  
  inputForm.addEventListener('submit', logSubmit);
  document.documentElement.addEventListener('click', resetFocusEmailForm);