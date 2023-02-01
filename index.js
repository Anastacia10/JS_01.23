//First Task
const isInteger = (value) =>{
  return (value > 0) && Number.isInteger(value) && Number.isSafeInteger(value);
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

const getNumberData = () =>{
  let value = prompt('First task: Enter an integer: ', 1);
  if(value === null){
    return console.log('Exit');
  }
  else if(!isInteger(+value)){
    console.log( 'Incorrect input!');
    return getNumberData();
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
getNumberData();

//Second task
const isValidString = (str) =>{
  return str.length > 0 && str.length <= 3 && str !== " ";
};

const isValidNumber = (num) =>{
  return isInteger(num) && num > 0 && num < 10;
};

const drawSquareOfStrings = () =>{
  const str = prompt('Second Task: Enter 1 to 3 chars');
  const num = +prompt('Second task Enter a number from 1-9');
  if(str === null || num === null){
    return console.log('Exit');
  }else if(!isValidString(str) || !isValidNumber(num)){
    console.log('Incorrect input!');
    return drawSquareOfStrings();
  }else{
    const row = (str + " ").repeat(num-1) + str;
    const table = new Array(num).fill(row).join('\n');
    return console.log(table);
  }
};
drawSquareOfStrings();
