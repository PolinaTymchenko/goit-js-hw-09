import Notiflix from 'notiflix';

const refs = {
  firstDelay: document.querySelector("input[name='delay']"),
  delayStep: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  submitButton: document.querySelector("button"),
}

refs.submitButton.addEventListener("click", promisesToCreate);

function promisesToCreate(e) {
  e.preventDefault();

  const amount = refs.amount.value;
  const delay = Number(refs.firstDelay.value);
  const step = Number(refs.delayStep.value);

  for (let i = 1; i <= amount; i += 1) {
    let interval = delay + step * (i - 1);
    createPromise(i, interval)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
};
