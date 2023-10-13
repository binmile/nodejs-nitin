const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));
const promises = [promise1, promise2, promise3];
Promise.any(promises).then((value) => console.log(value));
// race
const promiseA = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });
  const promiseB = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });
  Promise.race([promiseA, promiseB]).then((value) => {
    console.log(value);
  });
  function resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('this promise is resolved after  2 seconds ');
      }, 2000);
    });
  }
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
  }
  asyncCall();