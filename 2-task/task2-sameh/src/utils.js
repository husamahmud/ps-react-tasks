/*
M = P[r(1+r)^n]/[(1+r)^n - 1]
Where:

M = Monthly mortgage payment
P = Loan amount
r = Monthly interest rate (annual interest rate / 12)
n = Loan term in months
*/

function numberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export { numberWithCommas };
