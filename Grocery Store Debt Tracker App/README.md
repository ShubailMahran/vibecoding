<div align="center">

# 🛒 Grocery Debt Tracker
*A fast, simple digital ledger to track your shop's credit sales without the paperwork.*

</div>

---

## 🤔 The Problem It Solves

If you run a local grocery store or shop, you likely have regular customers who take items on credit and pay you later at the end of the month. 

**The Old Way (Paper Notebooks):**
- Notebooks get lost, messy, or damaged.
- Calculating how much a customer owes takes a long time.
- Mistakes happen when calculating totals.
- Giving the customer a summary of what they bought requires copying everything by hand.

**The Solution (Grocery Debt Tracker):**
Our app replaces your notebook with a simple mobile application. You add a customer, type what they took, and the app instantly calculates their total debt automatically. It's safe, fast, and does the math for you! 

---

## 🛠️ How It Works

It takes less than a minute to record a credit sale. Here is the step-by-step flow:

**Add Customer** 👤 ➡️ **Record Purchase** 🛒 ➡️ **Save** 💾 ➡️ **Total Updated** 💰

1. **Add Customer:** Open the app and create a profile for "Ahmed".
2. **Record Items:** Ahmed takes Milk and Sugar. You add them to his account.
3. **Save Transaction:** Tap save.
4. **Automatic Calculation:** The app calculates that Ahmed now owes 20 ﷼ completely automatically.
5. **Receive Payment:** When Ahmed pays you back, you simply add a "Payment" instead of a "Debt", and his total drops back to zero!

---

## ✨ Features

### A) Simple Features (For Store Owners)
- 📗 **Easy Customer Tracking:** Create profiles for each of your regular buyers.
- 💳 **Debt & Payment Recording:** Easily log when someone takes items on credit, and when they pay you back.
- 🔍 **Fast Search System:** Find any customer in seconds using the search bar.
- 📊 **Monthly Reports:** See how much money is owed to you in total across the entire store.
- 🌐 **Arabic & English Support:** Use the app completely in Arabic (with Right-to-Left layout) or English.

### B) Technical Features (For Developers)
- ⚛️ **State Management:** Robust contextual React hooks utilizing complex reducer patterns for atomic state transactions without race conditions.
- 🗄️ **Database Structure:** Local persistent storage architecture mapping `Customers` (`1`) to `Transactions` (`N`).
- 📄 **Export System:** Generates clean, physical-replica PDFs using `html2canvas` and parses tabular data into structured Excel sheets via `xlsx`.
- 🌍 **i18n Implementation:** Dynamic localization context switching between `en-US` and `ar-SA` including contextual layout flipping.

---

## 📱 Screens Explanation

| Screen | What it does |
|:---|:---|
| **🔒 Login Screen** | A secure entry point to ensure only the store owner can see the financial data. |
| **🏠 Dashboard** | Your home page. Shows exactly how much money is outside (Total Debt) and your top debtors. |
| **👥 Customer List** | A digital address book of everyone who buys from you, showing their current balance. |
| **➕ Add Transaction** | A fast, simple receipt-maker where you input the item names, quantities, and prices. |
| **📈 Reports Screen** | Detailed analytics with simple charts to see your business health, and buttons to export your data. |

---

## 🔄 Data Flow 

How your information travels under the hood:

```text
[ Store Owner Input ]
        ⬇
[ Customer Profile ] ──────> [ Transaction Record (Debt/Payment) ]
                                      ⬇
[ Local Device Database ] <───  [ Auto-Calculates Total Owed ]
        ⬇
[ Analytical Dashboard ] ───> [ Exported PDF/Excel Reports ]
```

---

## 💻 Tech Stack

This project uses modern, fast, and secure technologies:
- **Mobile Framework:** Ionic Capacitor (Bundles the web app into native Android/iOS apps)
- **Frontend Core:** React 18 & TypeScript (Built with Vite for blazing-fast speed)
- **Styling:** Tailwind CSS & Radix UI (For beautiful, accessible components)
- **Database:** Local Web Storage & IndexedDB Patterns
- **Export Tools:** `html2canvas` (PDFs) and `xlsx` (Excel)
- **Charts:** `recharts`

---

## 🚀 Installation Guide

### For Developers (Running on PC)
1. Must have **Node.js** installed.
2. Open terminal and run `npm install` to download dependencies.
3. Run `npm run dev` to start the app in your browser at `http://localhost:5173`.

### For Android Mobile Build (.APK)
> *Note: This requires Android Studio installed on your computer.*
1. Run `npm run build` to compile the app.
2. Run `npx cap sync` to copy code to the native platforms.
3. Run `npx cap open android` which will launch Android Studio.
4. From Android Studio, click **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate the file to install on your phone.

---

## ❓ Frequently Asked Questions (FAQ)

**Q: Do I need internet to use this app?**  
**A:** No! The core tracking runs 100% offline. You only need internet to download the app initially.

**Q: Where is my data kept? Is it private?**  
**A:** Everything is stored locally on your device. Nobody else can see your customer's debts.

**Q: Can I export data to print?**  
**A:** Yes! You can go to Reports and export PDF summaries to print, or Excel files to view on a computer.

**Q: Is it easy to use for beginners?**  
**A:** Very easy. We built this specifically for busy store owners—big buttons, clear numbers, and instant math.

---

## 🎨 UI & UX Design
This application was built with a **Mobile-First Approach**. That means it feels right at home on screens of any size, utilizing big touch-friendly buttons.
- **Clean Aesthetic:** No clutter, just the numbers and names you need.
- **RTL Native:** Full Arabic Right-To-Left UI flipping is handled optimally so the app feels completely native to strictly Arabic users.
- **Currency First:** Localized formatting ensures numbers intelligently render as (﷼) or (SAR) depending on your language.