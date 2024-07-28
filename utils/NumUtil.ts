export const formatKoreanCurrency = (num: number) => {
    if (num === 0) return '0';
  
    const units = ['억 ', '만 ', ''];
    const parts = [];
  
    let remaining = num;
  
    for (let i = 0; i < units.length; i++) {
      const unitValue = Math.pow(10000, units.length - i - 1);
      const unitAmount = Math.floor(remaining / unitValue);
      remaining = remaining % unitValue;
  
      if (unitAmount > 0) {
        parts.push(`${unitAmount.toLocaleString()}${units[i]}`);
      }
    }
  
    return parts.join('').trim();
  }