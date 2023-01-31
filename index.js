//First Task
const isInteger = (value) =>{
  return (value >= 0) && Number.isInteger(value) && Number.isSafeInteger(value);
};

const getPrimes = (num) =>{
  const seive = [];
  const primes = [];
  for (let i = 2; i <= num; i++){
    if (!seive[i]){
      primes.push(i);
      for (let j = i * i; j <= num; j += i) {
        seive[j] = true;
      } 
    }
  }
  return primes;
};

const findFactorial = (num) => {
  return num ? num * findFactorial(num - 1) : 1;
};

const isPrime = (num) =>{
  const primes = getPrimes(num);
  return num === primes[primes.length-1] ? true : false;
};

const isEven = (num) =>{
  if(num === 0){
    return false;
  }
  return num % 2 === 0 ? true : false;
};

const findDelimiters = (num) =>{
  const delimetrs = [];
  for (let i = 1; i <= num; i++){ 
    if(num % i === 0){
      delimetrs.push(i);
    }  
  }
  return delimetrs.sort((a, b) => b - a);
};

const numberData = () =>{
  let value = prompt('Enter an integer: ', 1);
  if(value === null){
    return console.log('Exit');
  }
  else if(!isInteger(+value)){
    console.log( 'Incorrect input!');
    return numberData();
  }else{
    const factorial = findFactorial(value);
    const square = value **2;
    const isPrimeStatus = isPrime(value);
    const isEvenStatus = isEven(value);
    const delimiters = findDelimiters(value);

    return console.log(`
      number: ${value}
      factorial: ${factorial}
      square: ${square}
      isPrime: ${isPrimeStatus}
      isEven: ${isEvenStatus}
      Delimiters: ${[...delimiters]}
    `);
  }
};
numberData();
