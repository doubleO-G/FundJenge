# JENGE Impact Fund - Static Website

**Professional donation platform for JENGE Impact Fund's WE BUILD campaign**

## 🎯 Overview

Static HTML website ready for GitHub Pages deployment. Supports the "WE BUILD" campaign to raise KES 1.2 billion over 15 years by mobilizing 55,000 builders for Kenya's creative sector.

## ✅ What's Included

### Pages
- **index.html** - Home page with campaign tracker, builder tiers, impact stories
- **about.html** - Mission statement, SESS model, campaign details
- **donate.html** - Donation form with Paystack payment integration
- **logo.png** - JENGE Kulture official logo
- **favicon.ico** - Site favicon

### Design
- ✅ **Official JENGE Kulture branding**
  - Primary: #FF5757 (coral red)
  - Secondary: #24190A (dark brown)
  - Accent: #FAAF14 (gold)
- ✅ **WCAG AA accessibility compliant** (≥4.5:1 contrast ratios)
- ✅ **Fully responsive** mobile-first design
- ✅ **Professional nonprofit** aesthetic

### Features
- ✅ Campaign progress tracker (KES 1.52M pledged of KES 20M)
- ✅ 6 builder tiers (Bronze to Palladium)
- ✅ Paystack payment integration (M-Pesa, cards, bank transfer)
- ✅ Contact forms
- ✅ Impact stories showcase
- ✅ SESS model visualization

## 🚀 Quick Deploy

**📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions**

### GitHub Pages (Recommended)
1. Add your Paystack public key to `donate.html` (line 437)
2. Push to GitHub repository
3. Enable Pages in Settings → use `/docs` folder
4. Live in 1-2 minutes!

Your site: `https://yourusername.github.io/repository-name/`

### Alternative Hosts
- **Netlify**: Drag and drop the `docs` folder at [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: Import repository and set root directory to `docs`
- **Any static host**: Upload HTML files directly

## ⚙️ Configuration

### 1. Paystack Payment Key
Replace placeholder in `donate.html` line 437:

```javascript
key: 'pk_live_xxxxxxxxxxxxx', // Your Paystack public key
```

Get your key: [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)

### 2. Update Campaign Stats
Edit values in `index.html`:

```html
<div class="stat-number">KES 1,520,000</div>
<div class="stat-label">Pledged of KES 20M Milestone</div>
```

## 📝 Builder Tiers

Six annual commitment tiers for 15 years:

| Tier | Annual | 15-Year Total |
|------|--------|---------------|
| Palladium | KES 25,000 | KES 375,000 |
| Platinum | KES 20,000 | KES 300,000 |
| Gold | KES 10,000 | KES 150,000 |
| Diamond | KES 5,000 | KES 75,000 |
| Silver | KES 2,000 | KES 30,000 |
| Bronze | KES 1,000 | KES 15,000 |

## 🔗 Deep Link Support

Pre-fill donation forms with URL parameters:

- `donate.html?type=builder` - Pre-select builder donation
- `donate.html?tier=gold` - Pre-select gold tier
- `donate.html?type=onetime` - Pre-select one-time donation

## 🎨 Design System

### Colors (JENGE Kulture Brand)
```css
--primary-color: #FF5757;    /* Coral red */
--secondary-color: #24190A;  /* Dark brown */
--accent-color: #FAAF14;     /* Gold */
```

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)

### Accessibility
- ✅ All text meets WCAG AA contrast (≥4.5:1)
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## 💳 Payment Integration

Uses **Paystack Inline (Popup)**:
1. User fills donation form
2. Paystack popup handles payment
3. Supports M-Pesa, cards, bank transfers
4. Success/failure messages
5. Track in Paystack Dashboard

**No backend needed** - payments go directly through Paystack.

## 🌍 Kenya Context

The platform addresses:
- 67% youth unemployment rate
- 703,000 jobs needed annually
- Creative economy = 5% of Kenya's GDP
- Goal: Support 500,000 youth by 2040

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks
- **Paystack Inline** - Direct payment integration

## 📄 License & Copyright

- **Logo**: © JENGE Kulture - All rights reserved
- **Design**: JENGE Kulture brand guidelines
- **Code**: Open for JENGE Impact Fund use

## 🤝 About JENGE

JENGE Impact Fund is a Kenyan youth employment endowment fund supporting solidarity-driven enterprises in Kenya's creative sector through the SESS model (Social Enterprise Support System).

**Learn more**: https://jengekulture.org

---

**Made with ❤️ for Kenya's creative future**
