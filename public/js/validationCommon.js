function validateFormKoncerty() {
  let valid = true;
  const miejsceKoncertuInput = document.getElementById('Miejsce_koncertu');
  const dataKoncertuInput = document.getElementById('Data_koncertu');

  const miejsceKoncertuError = document.getElementById('Miejsce_koncertu_error');
  const dataKoncertuError = document.getElementById('Data_koncertu_error');

  resetErrors([miejsceKoncertuInput, dataKoncertuInput], [miejsceKoncertuError, dataKoncertuError]);

  if (!checkRequired(miejsceKoncertuInput.value)) {
    valid = false;
    miejsceKoncertuInput.classList.add("error-input");
    miejsceKoncertuError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(miejsceKoncertuInput.value, 2, 60)) {
    valid = false;
    miejsceKoncertuInput.classList.add("error-input");
    miejsceKoncertuError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(dataKoncertuInput.value)) {
    valid = false;
    dataKoncertuInput.classList.add("error-input");
    dataKoncertuError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(miejsceKoncertuInput.value, 2, 60)) {
    valid = false;
    dataKoncertuInput.classList.add("error-input");
    dataKoncertuError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }
  return valid;
}

function validateFormSluchacze() {
  let valid = true;
  const loginInput = document.getElementById('login');
  const emailInput = document.getElementById('email');
  const imieInput = document.getElementById('Imie');
  const nazwiskoInput = document.getElementById('Nazwisko');
  const passwordInput = document.getElementById('password');

  const loginError = document.getElementById('login_error');
  const emailError = document.getElementById('email_error');
  const imieError = document.getElementById('imie_error');
  const nazwiskoError = document.getElementById('nazwisko_error');
  const passwordError = document.getElementById('password_error');


  resetErrors([loginInput, emailInput, imieInput, nazwiskoInput, passwordInput], [loginError, emailError, imieError, nazwiskoError, passwordError]);

  if (!checkRequired(loginInput.value)) {
    valid = false;
    loginInput.classList.add("error-input");
    loginError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(loginInput.value, 2, 60)) {
    valid = false;
    loginInput.classList.add("error-input");
    loginError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    emailError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(emailInput.value, 2, 60)) {
    valid = false;
    emailInput.classList.add("error-input");
    emailError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(imieInput.value)) {
    valid = false;
    imieInput.classList.add("error-input");
    imieError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(imieInput.value, 2, 60)) {
    valid = false;
    imieInput.classList.add("error-input");
    imieError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(nazwiskoInput.value)) {
    valid = false;
    nazwiskoInput.classList.add("error-input");
    nazwiskoError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(nazwiskoInput.value, 2, 60)) {
    valid = false;
    nazwiskoInput.classList.add("error-input");
    nazwiskoError.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }

  if (!checkRequired(passwordInput.value)) {
    valid = false;
    passwordInput.classList.add("error-input");
    passwordError.innerText = "Pole jest wymagane";
  } else if (!checkTextLengthRange(passwordInput.value, 5, 60)) {
    valid = false;
    passwordInput.classList.add("error-input");
    passwordError.innerText = "Pole powinno zawierać od 5 do 60 znaków";
  }


  return valid;
}









function resetErrors(inputs, errorTexts) {
  for(let i=0; i<inputs.length; i++) {
    inputs[i].classList.remove("error_input");
  }
  for(let i=0; i<errorTexts.length; i++) {
    errorTexts[i].innerText = "";
  }
}

function checkRequired(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  if (value === "") {
    return false;
  }
  return true;
}

function checkTextLengthRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;
  if (max && length > max) {
    return false;
  }
  if (min && length < min) {
    return false;
  }
  return true;
}
