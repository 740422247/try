export default {
  formateMoney,
  formateNum
}

// 金额格式化
function formateMoney(num) {
  const flag = num > 0;
  const n = num.toString();
  const i = n.lastIndexOf(".");
  const a = i > 0 ? n.slice(0, i) : n;
  const b =
    i < 0
      ? "00"
      : n.slice(i + 1, i + 3).length >= 2
        ? round(n.slice(i + 1, i + 4) / 10, 0)
        : n.slice(i + 1, i + 2) + "0";

  let inita = formateNum(Math.abs(a).toString());

  const integer = flag ? inita : "-" + inita;
  const result = integer + "." + b;
  return result;
}
// 数值整数部分格式化
function formateNum(num) {
  num = num.toString().slice(0, num.toString().lastIndexOf('.'));
  let a = Math.abs(num).toString();
  for (
    let index = Math.abs(num).toString().length - 3;
    index > 0;
    index -= 3
  ) {
    a = a.slice(0, index) + ',' + a.slice(index);
  }
  return a;
}
// 四舍五入
function round(num, dec) {
  if (num > 0) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  } else {
    return (
      (Math.round(num * Math.pow(10, dec) * -1) / Math.pow(10, dec)) * -1
    );
  }
}
