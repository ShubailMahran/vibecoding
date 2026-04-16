# Localization Quick Reference

## Basic Setup (Copy-Paste Template)

```tsx
// 1. Imports
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currency';
import { iconSpacing, rtlFlex } from '../utils/rtl';

// 2. In your component
export function MyScreen() {
  const { t, language, isRTL } = useLanguage();
  
  // Your code here...
}
```

## Common Replacements

| Element | Before | After |
|---------|--------|-------|
| **Text** | `"Total Debt"` | `{t.customers.totalDebt}` |
| **Currency** | `` `$${amount}` `` | `{formatCurrency(amount, language)}` |
| **Date** | `new Date().toLocaleDateString()` | `new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')` |
| **Button w/ Icon** | `<Button><Icon className="mr-2" />Text</Button>` | `<Button className={rtlFlex(isRTL)}><Icon className={iconSpacing(isRTL)} />{t.text}</Button>` |

## Layout Patterns

### 1. Flex with Icon (Left/Right)
```tsx
// ❌ Before
<div className="flex items-center">
  <UserCircle className="w-5 h-5 mr-2" />
  <span>Customer Name</span>
</div>

// ✅ After
<div className={`flex items-center ${rtlFlex(isRTL)}`}>
  <UserCircle className={`w-5 h-5 ${iconSpacing(isRTL)}`} />
  <span>{t.customers.name}</span>
</div>
```

### 2. Two-Column Layout
```tsx
// ❌ Before
<div className="flex justify-between">
  <span>Total</span>
  <span>$150.00</span>
</div>

// ✅ After
<div className={`flex justify-between ${rtlFlex(isRTL)}`}>
  <span>{t.label}</span>
  <span>{formatCurrency(150, language)}</span>
</div>
```

### 3. Search Input
```tsx
// ❌ Before
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
  <Input className="pl-10" placeholder="Search..." />
</div>

// ✅ After
<div className="relative">
  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
  <Input 
    className={isRTL ? 'pr-10' : 'pl-10'} 
    placeholder={t.common.search}
    dir={isRTL ? 'rtl' : 'ltr'}
  />
</div>
```

### 4. Text Input Fields
```tsx
// For user text (follows language direction)
<Input 
  value={name}
  onChange={(e) => setName(e.target.value)}
  dir={isRTL ? 'rtl' : 'ltr'}
/>

// For technical data (always LTR)
<Input 
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  dir="ltr"
/>
```

### 5. Text Alignment
```tsx
// Text that should align with language direction
<p className={isRTL ? 'text-right' : 'text-left'}>
  {content}
</p>
```

### 6. Card with Icon Badge
```tsx
<div className={`flex items-center gap-3 ${rtlFlex(isRTL)}`}>
  <div className="p-3 bg-green-100 rounded-lg">
    <Store className="w-5 h-5 text-green-600" />
  </div>
  <div className="flex-1">
    <p className="text-sm text-gray-500">{t.settings.storeName}</p>
    <p className="font-medium">{user?.storeName}</p>
  </div>
</div>
```

## Translation Keys Map

```tsx
// Navigation
t.nav.dashboard
t.nav.customers
t.nav.transactions
t.nav.reports
t.nav.settings

// Common Actions
t.common.save
t.common.cancel
t.common.delete
t.common.edit
t.common.add
t.common.search
t.common.loading

// Dashboard
t.dashboard.title
t.dashboard.totalDebt
t.dashboard.totalCustomers
t.dashboard.recentTransactions

// Customers
t.customers.title
t.customers.addCustomer
t.customers.name
t.customers.phone
t.customers.totalDebt
t.customers.searchCustomers
t.customers.deleteConfirm
t.customers.customerAdded

// Transactions
t.transactions.title
t.transactions.addTransaction
t.transactions.debt
t.transactions.payment
t.transactions.amount
t.transactions.date
t.transactions.notes

// Settings
t.settings.title
t.settings.profile
t.settings.language
t.settings.darkMode
```

## Currency Formatting

```tsx
// Format amount in SAR
formatCurrency(150, language)
// English: "150.00 SAR"
// Arabic: "١٥٠٫٠٠ ﷼"

// Compact format (no decimals for whole numbers)
formatCurrencyCompact(150, language)
// English: "150 SAR"
// Arabic: "١٥٠ ﷼"
```

## Common Mistakes to Avoid

❌ **Don't:**
```tsx
<Button className="flex items-center">
  <Plus className="mr-2" />Add
</Button>
```

✅ **Do:**
```tsx
<Button className={`flex items-center ${rtlFlex(isRTL)}`}>
  <Plus className={iconSpacing(isRTL)} />
  {t.common.add}
</Button>
```

---

❌ **Don't:**
```tsx
<span>${amount.toFixed(2)}</span>
```

✅ **Do:**
```tsx
<span>{formatCurrency(amount, language)}</span>
```

---

❌ **Don't:**
```tsx
<Input placeholder="Enter name" />
```

✅ **Do:**
```tsx
<Input 
  placeholder={t.customers.enterName}
  dir={isRTL ? 'rtl' : 'ltr'}
/>
```

## Testing Checklist

Before submitting your changes:

- [ ] Toggle language in Settings - does everything look correct?
- [ ] Check in both light and dark mode
- [ ] Verify all currency amounts show SAR symbol
- [ ] Ensure icons don't overlap text in either direction
- [ ] Test with long Arabic text to check for overflow
- [ ] Verify toast notifications use translations
- [ ] Check that dates format correctly

## VSCode Snippet (Optional)

Add this to your VSCode snippets for quick RTL button creation:

```json
{
  "RTL Button": {
    "prefix": "rtlbtn",
    "body": [
      "<Button className={\\`${1:w-full} \\${rtlFlex(isRTL)}\\`}>",
      "  <${2:Plus} className={\\`w-5 h-5 \\${iconSpacing(isRTL)}\\`} />",
      "  {t.${3:common.add}}",
      "</Button>"
    ]
  }
}
```

## Need More Examples?

Check these fully implemented screens:
- `/src/app/screens/Settings.tsx` - Complete settings with language toggle
- `/src/app/screens/Customers.tsx` - List, search, and forms
- `/src/app/screens/Dashboard.tsx` - Summary cards and lists
- `/src/app/screens/Login.tsx` - Simple form layout
