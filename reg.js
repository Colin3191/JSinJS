/**
 * 用正则匹配js中的number
 * .123和123.也是合法的number
 * 单个.不是合法的number
 */

const input = [
  "0",
  "1",
  "123",
  "01",
  "0.",
  "1.",
  "123.",
  "01.",
  ".0",
  ".123",
  "0.0",
  "123.123",
  "",
];

// 匹配整数(0, 123)
const reg1 = /^(0|([1-9][0-9]*))$/;

// 匹配整数 + 小数点(123.)
const reg2 = /^(0|([1-9][0-9]*))\.$/;

// 匹配小数点 + 整数(.123)
const reg3 = /^\.[0-9]+$/;

// 匹配小数点在中间(123.123)
const reg4 = /^(0|([1-9][0-9]*))\.[0-9]+$/;

// 合并正则
const reg5 =
  /((?:(?:0|(?:[1-9][0-9]*))\.[0-9]+)|(?:(?:0|[1-9][0-9]*)\.?)|(?:\.[0-9]+))|(\+)|(-)|(\*)|(\/)|(\s+)/g;

// input.forEach((t) => {
//   const res = reg5.exec(t)
//   console.log("输入:", t, "输出:", res);
// });

class Token {
  constructor(matched) {
    if (matched[1]) {
      this.type = "number";
      this.value = Number(matched[1]);
    } else if (matched[2]) {
      this.type = "add";
    } else if (matched[3]) {
      this.type = "sub";
    } else if (matched[4]) {
      this.type = "*";
    } else if (matched[5]) {
      this.type = "/";
    }
  }
}

let s = "1.1 * .2 / 3. * 4.0 /  5.";
let matched;
let tokens = [];
while ((matched = reg5.exec(s))) {
  if (!matched[6]) {
    tokens.push(new Token(matched));
  }
}

// add = number + number
// mul = number * number

// add = mul
// add = add + mul
// mul = number
// mul = number * mul

// function mul(tokens) {
//   if (!tokens[1]) {
//     return {
//       type: "number",
//     };
//   } else if (tokens[1].type === "mul" || tokens[1].type === "div") {
//     return {
//       left: tokens[0],
//       right: mul(tokens.slice(2)),
//       op: tokens[1].type,
//     };
//   }
//   throw new Error();
// }

function mul(tokens) {
    console.log(tokens)
  if (tokens[0].type === "number" || tokens[0].op?.type === '*') {
    const numToken = tokens.shift();
    tokens.unshift({
      type: "mul",
      value: numToken,
    });
    return mul(tokens);
  } else if (!tokens[1]) {
    return tokens[0];
  } else if (tokens[0].type === "mul") {
    const left = tokens.shift();
    const op = tokens.shift();
    const right = tokens.shift();
    tokens.unshift({
      left,
      op,
      right,
    });
    return mul(tokens);
  }
  throw new Error();
}
console.log(tokens);
const res = mul(tokens);
console.log(JSON.stringify(res, null, 2));
