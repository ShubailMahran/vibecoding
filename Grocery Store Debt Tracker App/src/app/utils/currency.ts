/**
 * Format amount in Saudi Riyal (SAR)
 * @param amount - The amount to format
 * @param language - The language for number formatting ('en' or 'ar')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, language: 'en' | 'ar' = 'en'): string => {
  // Format the number with proper separators
  const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Return with SAR symbol
  // In Arabic, currency symbol comes after the number
  // In English, we'll also put it after for consistency with local convention
  return language === 'ar' 
    ? `${formatted} ﷼`
    : `${formatted} SAR`;
};

/**
 * Format amount in Saudi Riyal without decimal places for whole numbers
 * @param amount - The amount to format
 * @param language - The language for number formatting ('en' or 'ar')
 * @returns Formatted currency string
 */
export const formatCurrencyCompact = (amount: number, language: 'en' | 'ar' = 'en'): string => {
  const isWholeNumber = amount % 1 === 0;
  
  const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return language === 'ar' 
    ? `${formatted} ﷼`
    : `${formatted} SAR`;
};

/**
 * Parse currency string back to number
 * @param currencyString - String like "150.00 SAR" or "١٥٠٫٠٠ ﷼"
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbols and spaces
  const cleaned = currencyString
    .replace(/﷼/g, '')
    .replace(/SAR/g, '')
    .replace(/\s/g, '')
    // Convert Arabic-Indic numerals to Western numerals
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
    // Convert Arabic decimal separator
    .replace(/٫/g, '.')
    // Remove thousands separators
    .replace(/,/g, '');

  return parseFloat(cleaned) || 0;
};
