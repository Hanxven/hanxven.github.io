(function() {
  "use strict";
  function toPartitionCombinations(numStr) {
    if (numStr.length === 0) {
      return [[]];
    }
    const partitions = [];
    for (let i = 1; i <= numStr.length; i++) {
      const prefix = numStr.slice(0, i);
      if (prefix.length > 1 && prefix[0] === "0") {
        continue;
      }
      const remainingPartitions = toPartitionCombinations(numStr.slice(i));
      for (const partition of remainingPartitions) {
        partitions.push([prefix, ...partition]);
      }
    }
    return partitions;
  }
  const operatorSet = /* @__PURE__ */ new Set(["+", "-", "*", "/", "^"]);
  function findOperator(expression, cnt = 1) {
    if (!isNaN(expression)) {
      return null;
    }
    let stack = [];
    let operator = "";
    for (let char of expression) {
      if (char === "(") {
        stack.push("(");
      } else if (char === ")") {
        if (stack.length > 0) {
          stack.pop();
        } else {
          return null;
        }
      } else if (operatorSet.has(char)) {
        if (stack.length === 0) {
          operator = char;
        }
      }
    }
    if (cnt === 1 && stack.length === 0) {
      return operator;
    } else {
      return null;
    }
  }
  function precedence(op) {
    switch (op) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      case "^":
        return 3;
      default:
        return -1e3;
    }
  }
  function applyOperator(op, b, a) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "^":
        return Math.pow(a, b);
      default:
        throw new Error("Unknown operator: " + op);
    }
  }
  function calculateExpression(expression) {
    const numStack = [];
    const opStack = [];
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === " ") {
        continue;
      }
      if (!isNaN(char)) {
        let num = char;
        while (i + 1 < expression.length && !isNaN(expression[i + 1])) {
          num += expression[++i];
        }
        numStack.push(Number(num));
      } else if (char === "(") {
        opStack.push(char);
      } else if (char === ")") {
        while (opStack[opStack.length - 1] !== "(") {
          if (opStack.length === 0) {
            throw new Error("Mismatched parentheses");
          }
          numStack.push(
            // @ts-ignore
            applyOperator(opStack.pop(), numStack.pop(), numStack.pop())
          );
        }
        opStack.pop();
      } else if (operatorSet.has(char)) {
        while (opStack.length && precedence(char) <= precedence(opStack[opStack.length - 1])) {
          numStack.push(
            // @ts-ignore
            applyOperator(opStack.pop(), numStack.pop(), numStack.pop())
          );
        }
        opStack.push(char);
      } else {
        throw new Error("Invalid character: " + char);
      }
    }
    while (opStack.length) {
      if (numStack.length < 2) {
        throw new Error("Invalid expression");
      }
      numStack.push(applyOperator(opStack.pop(), numStack.pop(), numStack.pop()));
    }
    if (numStack.length !== 1) {
      throw new Error("Invalid expression");
    }
    return numStack[0];
  }
  const cacheMapEx = /* @__PURE__ */ new Map();
  function addParentheses(expression) {
    if (!isNaN(expression)) {
      return /* @__PURE__ */ new Set([expression]);
    }
    if (cacheMapEx.has(expression)) {
      return cacheMapEx.get(expression);
    }
    const results = /* @__PURE__ */ new Set();
    for (let i = 1; i < expression.length - 1; i++) {
      const char = expression[i];
      if (operatorSet.has(char)) {
        const leftExprs = addParentheses(expression.slice(0, i));
        const rightExprs = addParentheses(expression.slice(i + 1));
        for (const left of leftExprs) {
          for (const right of rightExprs) {
            results.add(`${left} ${char} ${right}`);
            const isLeftExpr = isNaN(left);
            const isRightExpr = isNaN(right);
            if (isLeftExpr) {
              const sym = findOperator(left);
              if (sym && precedence(sym) >= precedence(char)) {
                continue;
              }
              results.add(`(${left}) ${char} ${right}`);
            }
            if (isRightExpr) {
              const sym = findOperator(right);
              if (sym && precedence(sym) >= precedence(char)) {
                continue;
              }
              results.add(`${left} ${char} (${right})`);
            }
            if (isLeftExpr && isRightExpr) {
              const leftSym = findOperator(left);
              const rightSym = findOperator(right);
              if (leftSym && precedence(leftSym) >= precedence(char)) {
                continue;
              }
              if (rightSym && precedence(rightSym) >= precedence(char)) {
                continue;
              }
              results.add(`(${left}) ${char} (${right})`);
            }
          }
        }
      }
    }
    cacheMapEx.set(expression, results);
    return results;
  }
  function generateExpressions(numArr) {
    if (numArr.length === 1) {
      return numArr;
    }
    let results = [];
    function backtrack(path, index) {
      if (index === numArr.length) {
        results.push(path.join(""));
        return;
      }
      for (const op of operatorSet.values()) {
        path.push(op);
        path.push(numArr[index]);
        backtrack(path, index + 1);
        path.pop();
        path.pop();
      }
    }
    backtrack([numArr[0]], 1);
    return results;
  }
  function splitArray(arr) {
    const results = [];
    for (let i = 1; i < arr.length; i++) {
      const part1 = arr.slice(0, i);
      const part2 = arr.slice(i);
      results.push([part1, part2]);
    }
    return results;
  }
  function setOperators(operators) {
    operatorSet.clear();
    operators.forEach((op) => operatorSet.add(op));
  }
  function generateHeroExpressions(arg1, arg2, arg3) {
    let mode = 4;
    if (Array.isArray(arg1) && arg1.every((v) => typeof v === "number") && arg1.length > 1) {
      mode = 0;
    } else if (typeof arg1 === "string" && arg1.length > 1 && !isNaN(arg1)) {
      if (arg2 === void 0) {
        mode = 1;
      } else if (typeof arg2 === "number") {
        mode = 2;
      } else if (typeof arg2 === "string" && arg2.length >= 1 && !isNaN(arg2)) {
        mode = 3;
      }
    }
    if (mode === 4) {
      console.warn(
        "Warning: Invalid arguments, please check the arguments and try again"
      );
      return [];
    }
    const results = [];
    let partitions;
    if (mode === 0) {
      partitions = [arg1.map((v) => v.toString())];
    } else {
      partitions = toPartitionCombinations(arg1).filter((a) => a.length > 1);
    }
    let rightPartitions;
    if (typeof arg2 === "string") {
      rightPartitions = toPartitionCombinations(arg2);
    }
    for (const p of partitions) {
      let splitted;
      if (mode === 1) {
        splitted = splitArray(p);
      } else if (mode === 2) {
        splitted = [[p, [arg2.toString()]]];
      } else if (mode === 3) {
        splitted = rightPartitions.map((a) => [p, a]);
      } else {
        splitted = [];
      }
      for (const [part1, part2] of splitted) {
        const exprs1 = generateExpressions(part1);
        const exprs2 = generateExpressions(part2);
        const valueMap1 = /* @__PURE__ */ new Map();
        const valueMap2 = /* @__PURE__ */ new Map();
        const exprs1Parens = exprs1.reduce((acc, cur) => {
          const parens = addParentheses(cur);
          return [...acc, ...parens];
        }, []);
        const exprs2Parens = exprs2.reduce((acc, cur) => {
          const parens = addParentheses(cur);
          return [...acc, ...parens];
        }, []);
        for (const e1 of exprs1Parens) {
          const value = calculateExpression(e1);
          if (valueMap1.has(value)) {
            valueMap1.get(value).push(e1);
          } else {
            valueMap1.set(value, [e1]);
          }
        }
        for (const e2 of exprs2Parens) {
          const value = calculateExpression(e2);
          if (valueMap2.has(value)) {
            valueMap2.get(value).push(e2);
          } else {
            valueMap2.set(value, [e2]);
          }
        }
        for (const [value, exprs] of valueMap1) {
          if (valueMap2.has(value)) {
            const exprs22 = valueMap2.get(value);
            for (const e1 of exprs) {
              for (const e2 of exprs22) {
                results.push(`${e1} = ${e2}`);
              }
            }
          }
        }
      }
    }
    return results;
  }
  self.addEventListener("message", (event) => {
    setOperators(event.data.operators);
    if (event.data.mode === "default") {
      self.postMessage({ name: "start" });
      const results = generateHeroExpressions(event.data.value1);
      self.postMessage({ name: "result", data: results });
    } else if (event.data.mode === "equals") {
      self.postMessage({ name: "start" });
      const results = generateHeroExpressions(
        event.data.value1,
        event.data.value2
      );
      self.postMessage({ name: "result", data: results });
    }
  });
})();
