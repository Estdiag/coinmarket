export const formatCurrency = (value: string | number) => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (!isFinite(num)) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatLargeNumber = (value: string | number) => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (!isFinite(num)) return '-';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};