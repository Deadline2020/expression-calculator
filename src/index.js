function eval() {
  // Do not use eval!!!
  return;
}

let parseExpressionToArr = (str) => {
  let strToArr = [];
  let singleNumber = "";
  for (symbol of str) {
    if (symbol === " ") continue;
    if (isNaN(symbol)) {
      if (singleNumber) strToArr.push(singleNumber);
      strToArr.push(symbol);
      singleNumber = "";
    } else {
      singleNumber += symbol;
    }
  }
  if (singleNumber) strToArr.push(singleNumber);
  return strToArr;
}

let getPriority = (key) => {
  const priority = {
    "(": 1,
    ")": 2,
    "+": 3,
    "-": 3,
    "*": 4,
    "/": 4,
  };
  return priority[key] || 0;
}

let getReversePolishNotation = (expressionInArr) => {
  let arrResult = [];
  let arrTemp = [];
  let counterBracket = 0;
  for (item of expressionInArr) {
    let priority = getPriority(item);
    if (priority === 0) {
      arrResult.push(item);
      continue;
    }
    if (priority === 1) {
      arrTemp.push(item);
      counterBracket++;
      continue;
    }
    if (priority === 2) {
      if (!arrTemp.length || !counterBracket) {
        counterBracket--;
        break;
      }
      let i = arrTemp.length;
      let tempItem;
      while (i > 0) {
        tempItem = arrTemp.pop();
        if (tempItem === "(") {
          counterBracket--;
          break;
        }
        arrResult.push(tempItem);
        i--;
      }
      continue;
    }
    if (!arrTemp.length || (priority > getPriority(arrTemp[arrTemp.length - 1]))) {
      arrTemp.push(item);
      continue;
    }
    while (priority <= getPriority(arrTemp[arrTemp.length - 1])) {
      arrResult.push(arrTemp.pop());
    }
    arrTemp.push(item);
  }
  if (counterBracket) throw "ExpressionError: Brackets must be paired";
  while (arrTemp.length > 0) {
    arrResult.push(arrTemp.pop());
  }
  return arrResult;
}

let getNumbers = (arr) => {
  let second = arr.pop();
  let first = arr.pop();
  return [first, second];
}

function expressionCalculator(expr) {
  let expressionInArr = parseExpressionToArr(expr);
  let readyRPN = getReversePolishNotation(expressionInArr);
  let result = [];
  let tempElem, firstNum, secondNum;
  while (readyRPN.length > 0) {
    tempElem = readyRPN.shift();
    switch (tempElem) {
      case "+":
        [firstNum, secondNum] = getNumbers(result);
        result.push(firstNum + secondNum);
        break;
      case "-":
        [firstNum, secondNum] = getNumbers(result);
        result.push(firstNum - secondNum);
        break;
      case "*":
        [firstNum, secondNum] = getNumbers(result);
        result.push(firstNum * secondNum);
        break;
      case "/":
        [firstNum, secondNum] = getNumbers(result);
        if (!secondNum) throw "TypeError: Division by zero.";
        result.push(firstNum / secondNum);
        break;
      default:
        result.push(+tempElem);
    }
  }
  return +(result[0].toFixed(4));
}

module.exports = {
  expressionCalculator
}
