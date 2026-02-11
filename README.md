# Dr. Aqua Dashboard - Standalone React App

A complete business management dashboard extracted from the Dr. Aqua Next.js project.

## Features

- 📊 **Sales Dashboard** - Track daily, weekly, and monthly sales with charts
- 📦 **Inventory Management** - Add, edit, delete products with stock alerts
- 🧾 **Billing & Receipts** - Generate bills and download PDF receipts
- 👥 **Customer Management** - Track customers with service reminders

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Navigate to the dashboard folder
cd dashboard-standalone

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at http://localhost:3000

### Build for Production

```bash
npm run build
```

The production build will be in the `build` folder.

## Tech Stack

- React 18
- Chart.js (for sales charts)
- jsPDF (for PDF generation)
- Tailwind CSS (via CDN)
- localStorage (for data persistence)

## Data Storage

All data is stored in the browser's localStorage:
- `draqua-inventory` - Product inventory
- `draqua-customers` - Customer records
- `draqua-sales` - Sales history

## Project Structure

```
dashboard-standalone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BillingManager.js
│   │   ├── CustomerManager.js
│   │   ├── InventoryManager.js
│   │   └── SalesDashboard.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── types.ts
├── package.json
└── README.md
```

## License

MIT
