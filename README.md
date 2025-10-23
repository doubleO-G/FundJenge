# JENGE Impact Fund - Donation Platform

A professional donation platform for JENGE Impact Fund supporting the "WE BUILD" campaign to raise KES 1.2 billion over 15 years for Kenya's youth employment.

## 🎨 Features

- **Modern Design** with JENGE Kulture branding (coral red #FF6B6B)
- **Paystack Integration** for African payment methods (M-Pesa, cards, bank transfers)
- **Builder Tiers** - Monthly commitment options for sustained support
- **One-Time Donations** - Flexible giving options
- **Responsive Design** - Works on all devices
- **Hash-based Routing** - Perfect for GitHub Pages deployment

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

Visit `http://localhost:5000`

### Build for Production
```bash
npm run build
```

### Build for GitHub Pages
```bash
npm run build:gh-pages
```

## 📦 Deploy to GitHub Pages

See **[DEPLOY_TO_GITHUB_PAGES.md](./DEPLOY_TO_GITHUB_PAGES.md)** for complete deployment instructions.

**Quick summary:**
1. Create a GitHub repository
2. Push your code
3. Add `VITE_PAYSTACK_PUBLIC_KEY` to GitHub Secrets
4. Enable GitHub Pages with "GitHub Actions" as source
5. Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

## 🔑 Environment Variables

- `VITE_PAYSTACK_PUBLIC_KEY` - Your Paystack public key (required for donations)

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Payments**: Paystack
- **Routing**: Wouter (hash-based for GitHub Pages)
- **Forms**: React Hook Form + Zod validation

## 📝 Project Structure

```
├── client/
│   ├── src/
│   │   ├── pages/          # Page components (Home, About, Donate)
│   │   ├── components/     # Reusable components
│   │   └── lib/            # Utilities and helpers
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── attached_assets/        # Images and static assets
```

## 🎯 Campaign Goal

**Target**: KES 1.2 Billion over 15 years  
**Mission**: Support 500,000 youth achieve sustainable income by 2040

## 💳 Payment Methods Supported

Through Paystack:
- M-Pesa (Mobile Money)
- Credit/Debit Cards
- Bank Transfers
- USSD

## 📄 License

MIT

## 🤝 Contributing

This platform supports JENGE Impact Fund's mission to create economic opportunities for Kenya's youth through solidarity-driven enterprises.

---

**Built with ❤️ for Kenya's creative economy**
