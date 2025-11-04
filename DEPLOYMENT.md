# Deploying JENGE Impact Fund to GitHub Pages

This guide explains how to deploy the JENGE Impact Fund donation platform as a static site on GitHub Pages.

## Prerequisites

- Node.js 20+ installed
- GitHub repository created
- Paystack account with public key

## Build for GitHub Pages

### Step 1: Build the Static Site

```bash
npm run build:static
```

This creates optimized static files in the `dist/public` directory.

### Step 2: Copy Static Data Files

The build process needs these static JSON files in the output directory:

```bash
cp client/public/campaign-stats.json dist/public/
cp client/public/stories.json dist/public/
```

### Step 3: Configure Environment Variables

Create a `.env.production` file with your Paystack public key:

```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_key_here
```

For testing, you can use the test key:
```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
```

### Step 4: Update Campaign Stats

To update the campaign progress, edit `client/public/campaign-stats.json`:

```json
{
  "pledged": 1520000,
  "goal": 20000000,
  "builders": 42
}
```

Then rebuild and redeploy.

## Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build:static
        env:
          VITE_PAYSTACK_PUBLIC_KEY: ${{ secrets.VITE_PAYSTACK_PUBLIC_KEY }}
        
      - name: Copy static files
        run: |
          cp client/public/campaign-stats.json dist/public/
          cp client/public/stories.json dist/public/
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist/public
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

2. Add your Paystack public key to GitHub Secrets:
   - Go to repository Settings → Secrets and variables → Actions
   - Add `VITE_PAYSTACK_PUBLIC_KEY` with your public key

3. Enable GitHub Pages:
   - Go to Settings → Pages
   - Source: GitHub Actions

### Option 2: Manual Deployment

1. Build the site locally:
```bash
npm run build:static
cp client/public/*.json dist/public/
```

2. Push the `dist/public` folder to `gh-pages` branch:
```bash
git subtree push --prefix dist/public origin gh-pages
```

3. Enable GitHub Pages from the `gh-pages` branch in repository settings.

## Features Working in Static Mode

✅ **Working:**
- All pages (Home, About, Donate)
- Campaign progress tracking (from static JSON)
- Paystack Inline payments (client-side)
- Contact form (via Formspree)
- Dark mode toggle
- Responsive design
- Hash-based routing

❌ **Not Available (requires backend):**
- Real-time campaign stats updates
- Payment verification and automated pledge creation
- Server-side payment processing

## Updating Campaign Data

To update the campaign statistics:

1. Edit `client/public/campaign-stats.json`
2. Commit and push changes
3. GitHub Actions will automatically rebuild and redeploy

## Custom Domain (Optional)

1. Add a `CNAME` file to `client/public/` with your domain:
```
donate.jengeimpact.org
```

2. Configure DNS:
   - Add CNAME record pointing to `yourusername.github.io`
   - Enable HTTPS in GitHub Pages settings

## Troubleshooting

**Issue: Payments not working**
- Verify `VITE_PAYSTACK_PUBLIC_KEY` is set correctly
- Check browser console for Paystack script loading
- Ensure using correct key (test vs live)

**Issue: Pages return 404**
- Verify hash routing is working (#/ in URLs)
- Check that all routes use the hash location hook

**Issue: Contact form not working**
- Verify Formspree endpoint is correct
- Check network tab for submission errors

## Contact Form Setup

The contact form uses Formspree. To use your own:

1. Sign up at https://formspree.io
2. Create a new form
3. Update the endpoint in `client/src/components/contact-form.tsx`:
```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

## Support

For issues or questions:
- GitHub Issues: [Your Repo URL]
- Email: fund@jengekulture.org
