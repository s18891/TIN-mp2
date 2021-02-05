function validateFormKoncerty() {
  let valid = true;
  const miejsceKoncertuInput = document.getElementById('Miejsce_koncertu');
  const dataKoncertuInput = document.getElementById('Data_koncertu');
  const max_iloscInput = document.getElementById('max_ilosc');
  const czas_trwaniaInput = document.getElementById('czas_trwania');



  const miejsceKoncertuError = document.getElementById('Miejsce_koncertu_error');
  const dataKoncertuError = document.getElementById('Data_koncertu_error');
  const max_iloscError = document.getElementById('max_ilosc_error');
  const czas_trwaniaError = document.getElementById('czas_trwania_error');


  resetErrors([miejsceKoncertuInput, dataKoncertuInput, max_iloscInput, czas_trwaniaInput], [miejsceKoncertuError, dataKoncertuError, max_iloscError, czas_trwaniaError]);

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
  }

  if (!checkRequired(max_iloscInput.value)) {
    valid = false;
    max_iloscInput.classList.add("error-input");
    max_iloscError.innerText = "Pole jest wymagane";
  } else  if (!checkNumberRange(max_iloscInput.value, 1, 1000000)) {
    valid = false;
    max_iloscInput.classList.add("error-input");
    max_iloscError.innerText = "Pole powinno zawierac wartości od 1 do 1000000";
    }
  if (!checkNumberRange(czas_trwaniaInput.value, 1, 1000000)) {
    valid = false;
    czas_trwaniaInput.classList.add("error-input");
    czas_trwaniaError.innerText = "Pole powinno zawierac wartości od 1 do 1000000";
  }

  return valid;
}

function validateFormRezerwacje() {
  let valid = true;
  const iloscInput = document.getElementById('ilosc');
  const komentarzInput = document.getElementById('Komentarz');


  const iloscError = document.getElementById('ilosc_error');
  const komentarzError = document.getElementById('Komentarz_error');

  resetErrors([iloscInput, komentarzInput], [iloscError, komentarzError]);

  if (!checkRequired(iloscInput.value)) {
    valid = false;
    iloscInput.classList.add("error-input");
    iloscError.innerText = "Pole jest wymagane";
  } else if (!checkNumberRange(iloscInput.value, 1, 1000)) {
    valid = false;
    iloscInput.classList.add("error-input");
    iloscError.innerText = "Pole powinno wartość od 1 do 1000";
  }

  if (!checkTextLengthRangeOrEmpty(komentarzInput.value, 0, 500)) {
    valid = false;
    komentarzInput.classList.add("error-input");
    komentarzError.innerText = "Pole powinno zawierać od 0 do 500 znaków";
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
  } else if (!checkEmail(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    emailError.innerText = "Nie wprowadzono poprawnego adresu email";
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
    passwordError.innerText = "Pole powinno zawierać od 5 do 60 znakówww";
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

function checkEmail(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(value.toLocaleLowerCase());
}
function checkDateAfter(value) {
  if (!value) {
    return false;
  }
  testDate = value;
  currDate = Date.now();
console.log("TEST DATE:   " + testDate)
  console.log("CURR DATE:   " + currDate)

  return currDate-testDate;
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

function checkTextLengthRangeOrEmpty(value, min, max) {

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

function checkNumberRange(value, min, max) {
  min=min-1;
  max=max+1;
  let bool = false;
  if (!value) {
    return true;
  }

  if (value >= max) {
    return bool;
  }
  if (value <= min) {
    return bool;
  }
  return true;
}
