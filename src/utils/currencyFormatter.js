export function formatCurrency(num) {
  if(!num && num !== 0) return '-';

  const decimalPlaces = (num % 1 === 0) ? 2 : Math.max(num.toString().split('.')[1]?.length || 0, 2);
  const formattedNum = parseFloat(num.toFixed(decimalPlaces)).toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces
  });

  return '$' + formattedNum;
}