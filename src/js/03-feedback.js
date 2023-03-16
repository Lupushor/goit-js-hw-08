const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const inputData = throttle(e => {
  const formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}, 500);

const saveData = e => {
  e.preventDefault();

  if (email.value === '' || message.value === '') {
    return alert('Заповнiть, будьласка, всi поля');
  }
  console.log({ email: email.value, message: message.value });

  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);

if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}

form.addEventListener('input', inputData);
form.addEventListener('submit', saveData);