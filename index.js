const isObject = (value) =>{
  return Object.prototype.toString.call(value) == '[object Object]';
};

const isArray = (value) =>{
  return Object.prototype.toString.call(value) == '[object Array]';
};

const isPrimitive = (value) =>{
  return value === null || typeof value !== "object"; 
};

const isDate = (value) =>{
  return Object.prototype.toString.call(value) == '[object Date]';
};

const isMap = (value) =>{
  return Object.prototype.toString.call(value) == '[object Map]';
};

const isSet = (value) =>{
  return Object.prototype.toString.call(value) == '[object Set]';
};

const copyObject = (obj) =>{
  if(isPrimitive(obj)){
    return obj;

  }else if(isDate(obj)){
    return new Date(obj);

  }else if(isArray(obj)){
    return obj.map((el) =>{
      return copyObject(el);
    });

  }else if(isMap(obj)){
    const newMap = new Map();
    for (const key of obj.keys()) {
      const value  = copyObject(obj.get(key));
      newMap.set(key, value);
    }
    return newMap;
  }else if(isSet(obj)){
    const newSet = new Set();
    for(let el of obj){
      newSet.add(copyObject(el));
    }
    return newSet;
  }else if(isObject(obj)){
    let result = {};
    for (const key in obj) {
      result[key] = copyObject(obj[key]);
    };
    return result;
  }
}

const makeDeepCopy = (value) =>{
  if(isPrimitive(value)){
    throw new Error();

  }else{
    return copyObject(value);
  }
}




