const currency = 'R$ ';

export function currencyFormat (inputValue: number | string, wcurrency = false) {
  const value = inputValue || 0;
  const returning = ((parseFloat((typeof (value) === 'number' ? (value).toFixed(2).toString() : value).replace(/\D/g, '')) / 100)
    .toFixed(2) + '')
    .replace('.', ',')
    .replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
    .replace(/(\d)(\d{3}),/g, '$1.$2,');

  return wcurrency ? currency + returning : returning;
}
