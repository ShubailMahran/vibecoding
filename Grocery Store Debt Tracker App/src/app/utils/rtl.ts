/**
 * Utility to get the correct spacing class for icons in LTR/RTL layouts
 */
export const iconSpacing = (isRTL: boolean, position: 'before' | 'after' = 'before'): string => {
  if (position === 'before') {
    return isRTL ? 'ml-2' : 'mr-2';
  }
  return isRTL ? 'mr-2' : 'ml-2';
};

/**
 * Utility to get flex-row-reverse class for RTL
 */
export const rtlFlex = (isRTL: boolean): string => {
  return isRTL ? 'flex-row-reverse' : '';
};
