# Arabic Localization & RTL Implementation Guide

## Overview
This guide explains how to implement Arabic language support and RTL (Right-to-Left) layout in the remaining screens of the Debt Tracker app.

## What's Already Implemented

### Core System
1. **Translation System** (`/src/app/i18n/translations.ts`)
   - Complete English and Arabic translations
   - Type-safe translation keys

2. **Language Context** (`/src/app/i18n/LanguageContext.tsx`)
   - Language state management
   - RTL direction handling
   - Auto-detection of browser language

3. **Currency Utilities** (`/src/app/utils/currency.ts`)
   - `formatCurrency(amount, language)` - Formats amounts in SAR
   - `formatCurrencyCompact(amount, language)` - Compact format for whole numbers
   - `parseCurrency(currencyString)` - Parses currency back to number

4. **RTL Utilities** (`/src/app/utils/rtl.ts`)
   - `iconSpacing(isRTL, position)` - Returns correct spacing class for icons
   - `rtlFlex(isRTL)` - Returns flex-row-reverse for RTL

5. **Fonts** (`/src/styles/fonts.css`)
   - Noto Sans Arabic for Arabic text
   - Inter for English text
   - Auto-switches based on `dir` attribute

### Updated Screens
- ✅ Settings (full implementation with language toggle)
- ✅ Dashboard (translations + currency)
- ✅ Customers (translations + RTL + currency)
- ✅ Login (translations + RTL)
- ✅ Signup (translations + RTL)
- ✅ BottomNav (translations)
- ✅ SummaryCard (RTL support)

## How to Implement in Remaining Screens

### Step 1: Import Required Hooks and Utilities

```tsx
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';
```

### Step 2: Get Language Context

```tsx
export function YourScreen() {
  const { t, language, isRTL } = useLanguage();
  // ... rest of component
}
```

### Step 3: Replace Hard-coded Text

**Before:**
```tsx
<h1>Customer Details</h1>
```

**After:**
```tsx
<h1>{t.customerDetails.title}</h1>
```

### Step 4: Format Currency

**Before:**
```tsx
const formatted = `₱${amount.toFixed(2)}`;
```

**After:**
```tsx
import { formatCurrency } from '../utils/currency';
// ...
const formatted = formatCurrency(amount, language);
```

### Step 5: Handle RTL Layout

#### For Flex Containers with Icons

**Before:**
```tsx
<div className="flex items-center">
  <Plus className="w-5 h-5 mr-2" />
  Add Transaction
</div>
```

**After:**
```tsx
<div className={`flex items-center ${rtlFlex(isRTL)}`}>
  <Plus className={`w-5 h-5 ${iconSpacing(isRTL)}`} />
  {t.transactions.addTransaction}
</div>
```

#### For Two-Column Layouts (justify-between)

**Before:**
```tsx
<div className="flex justify-between">
  <span>Total Debt</span>
  <span>$150.00</span>
</div>
```

**After:**
```tsx
<div className={`flex justify-between ${rtlFlex(isRTL)}`}>
  <span>{t.customers.totalDebt}</span>
  <span>{formatCurrency(150, language)}</span>
</div>
```

#### For Search Icons

**Before:**
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
  <Input className="pl-10" />
</div>
```

**After:**
```tsx
<div className="relative">
  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2`} />
  <Input className={isRTL ? 'pr-10' : 'pl-10'} />
</div>
```

### Step 6: Handle Input Direction

For text inputs that should follow language direction:
```tsx
<Input
  value={name}
  onChange={(e) => setName(e.target.value)}
  dir={isRTL ? 'rtl' : 'ltr'}
/>
```

For inputs that should always be LTR (phone numbers, emails):
```tsx
<Input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  dir="ltr"
/>
```

### Step 7: Date Formatting

**Before:**
```tsx
new Date(date).toLocaleDateString()
```

**After:**
```tsx
new Date(date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')
```

## Screens That Need Updates

### AddTransaction.tsx
- Replace all text with translations from `t.transactions.*`
- Use `formatCurrency()` for amount displays
- Apply RTL flex to form layouts
- Add `dir` attribute to text inputs

### CustomerDetails.tsx
- Replace text with `t.customerDetails.*`
- Use `formatCurrency()` for all amounts
- Apply RTL to transaction list items
- Format dates with proper locale

### Reports.tsx
- Replace text with `t.reports.*`
- Use `formatCurrency()` for all financial data
- Apply RTL to charts and filters
- Ensure export functions handle Arabic text

## Currency Symbol Display

The app uses Saudi Riyal (SAR):
- **English:** `150.00 SAR`
- **Arabic:** `١٥٠٫٠٠ ﷼`

The `formatCurrency()` function handles this automatically based on language.

## Common Patterns

### Pattern 1: Cards with Icon and Text
```tsx
<div className={`flex items-center gap-3 ${rtlFlex(isRTL)}`}>
  <div className="p-3 bg-green-100 rounded-lg">
    <Icon className="w-5 h-5 text-green-600" />
  </div>
  <div className="flex-1">
    <p className="text-sm text-gray-500">{t.label}</p>
    <p className="font-medium">{value}</p>
  </div>
</div>
```

### Pattern 2: Buttons with Icons
```tsx
<Button className={rtlFlex(isRTL)}>
  <Icon className={`w-5 h-5 ${iconSpacing(isRTL)}`} />
  {t.buttonText}
</Button>
```

### Pattern 3: List Items with Actions
```tsx
<div className={`flex items-center justify-between ${rtlFlex(isRTL)}`}>
  <div className="flex-1">
    <p>{customer.name}</p>
    <p className="text-sm">{formatCurrency(amount, language)}</p>
  </div>
  <Button variant="ghost">
    <Trash2 className="w-5 h-5" />
  </Button>
</div>
```

### Pattern 4: Text Alignment
For text that should align based on direction:
```tsx
<div className={isRTL ? 'text-right' : 'text-left'}>
  {content}
</div>
```

## Testing Checklist

When implementing localization in a screen:

- [ ] All visible text uses translations
- [ ] All currency amounts use `formatCurrency()`
- [ ] All flex containers with icons use `rtlFlex()` and `iconSpacing()`
- [ ] Search icons position correctly in both LTR and RTL
- [ ] Input fields have appropriate `dir` attribute
- [ ] Dates use locale-specific formatting
- [ ] Buttons and cards maintain visual balance in both directions
- [ ] Numbers display correctly (Arabic numerals in Arabic mode)
- [ ] Toast notifications use translated messages

## Available Translation Keys

### Common
- `t.common.loading`, `save`, `cancel`, `delete`, `edit`, `add`, `search`, `clear`, `confirm`, `close`, `back`, `next`, `submit`

### Navigation
- `t.nav.dashboard`, `customers`, `transactions`, `reports`, `settings`

### Auth
- `t.auth.login`, `signup`, `logout`, `email`, `password`, `storeName`, etc.

### Dashboard
- `t.dashboard.totalDebt`, `totalCustomers`, `totalTransactions`, `todayTransactions`, etc.

### Customers
- `t.customers.title`, `addCustomer`, `name`, `phone`, `totalDebt`, `searchCustomers`, etc.

### Transactions
- `t.transactions.title`, `addTransaction`, `debt`, `payment`, `amount`, `date`, `notes`, etc.

### Customer Details
- `t.customerDetails.overview`, `currentDebt`, `totalDebts`, `totalPayments`, etc.

### Reports
- `t.reports.title`, `dateRange`, `summary`, `totalDebts`, `exportPDF`, etc.

### Settings
- `t.settings.title`, `profile`, `appearance`, `darkMode`, `language`, etc.

## Tips

1. **Always test in both languages** - Switch language in Settings to verify layout
2. **Use browser DevTools** - Check RTL layout in Chrome/Firefox DevTools
3. **Mind the spacing** - Icons should have proper spacing in both directions
4. **Keep it readable** - Ensure Arabic text has enough space and doesn't overlap
5. **Consistent alignment** - All similar components should align the same way

## Example: Complete Screen Implementation

See `/src/app/screens/Customers.tsx` for a complete reference implementation showing:
- Translation usage
- RTL layout handling
- Currency formatting
- Input direction handling
- Dialog/Modal RTL support
