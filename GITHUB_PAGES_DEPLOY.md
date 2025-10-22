# Deploy JENGE Impact Fund to GitHub Pages

This guide shows you how to deploy your JENGE Impact Fund donation platform to GitHub Pages for free hosting.

## Quick Start (5 Minutes)

### Step 1: Create `.github/workflows/deploy.yml`

Create this file in your repository with the following content:

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

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_PAYSTACK_PUBLIC_KEY: ${{ secrets.VITE_PAYSTACK_PUBLIC_KEY }}
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment"
   - Source: Select **GitHub Actions**

### Step 3: Add Paystack Secret

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_PAYSTACK_PUBLIC_KEY`
4. Value: Your Paystack public key (e.g., `pk_live_xxxxx` or `pk_test_xxxxx`)
5. Click **Add secret**

### Step 4: Deploy

Push your code to the `main` branch:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## Features That Work

✅ All pages (Home, About, Donate)
✅ Paystack payments (client-side popup)
✅ Contact form (via Formspree)
✅ Campaign progress tracking
✅ Dark mode toggle
✅ Fully responsive design

## Updating Campaign Stats

The campaign statistics are served from the backend when running locally, but for GitHub Pages you'll need to configure them as static data or use an external API.

### Option A: Static JSON (Simple)

1. Create `client/public/campaign-stats.json`:
```json
{
  "pledged": 1520000,
  "goal": 20000000,
  "builders": 42
}
```

2. Update the stats hook to use this file (already done if using the static version)

3. To update stats, edit the JSON file and push changes

### Option B: External API (Dynamic)

Use a service like:
- Airtable (with public API)
- Google Sheets (with public API)
- Supabase (free tier)

## Custom Domain (Optional)

### Step 1: Add CNAME File

Create `client/public/CNAME` with your domain:
```
donate.jengeimpact.org
```

### Step 2: Configure DNS

Add these DNS records at your domain provider:

For apex domain (jengeimpact.org):
```
Type: A
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

For subdomain (donate.jengeimpact.org):
```
Type: CNAME
Host: donate
Value: yourusername.github.io
```

### Step 3: Enable HTTPS

1. Go to Settings → Pages
2. Check **Enforce HTTPS**
3. Wait 24 hours for DNS propagation
4. Your site will be available at your custom domain with SSL

## Contact Form Setup

The app uses Formspree for contact forms. To use your own:

1. Sign up at https://formspree.io (free for 50 submissions/month)
2. Create a new form
3. Get your form endpoint (e.g., `https://formspree.io/f/xxxxx`)
4. Update in `client/src/components/contact-form.tsx`:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
   ```

## Payment Processing

### Current Setup
- Uses Paystack Inline (client-side popup)
- Payments process directly through Paystack
- No server-side verification (static site limitation)

### Important Notes
- Payment verification happens in Paystack dashboard
- No automatic database updates (static site)
- Suitable for donation tracking via Paystack dashboard

### Upgrade Path (With Backend)
For full payment verification and automated processes:
1. Deploy backend to Heroku/Railway/Render
2. Add payment webhook endpoint
3. Connect to database for real-time stats

## Troubleshooting

### Build Fails
- Check that all secrets are set correctly
- Verify Node version is 20.x
- Check GitHub Actions logs for specific errors

### Pages Show 404
- Ensure hash-based routing is working (`/#/` in URLs)
- Check that Pages is enabled in repository settings
- Verify the build artifact path is correct

### Payments Don't Work
- Verify `VITE_PAYSTACK_PUBLIC_KEY` secret is set
- Check browser console for Paystack script errors
- Ensure using correct key (test vs live)

### Custom Domain Not Working
- Wait 24 hours for DNS propagation
- Verify DNS records are correct
- Check CNAME file exists in build output

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Support

- GitHub Issues: Open an issue in your repository
- Paystack Docs: https://paystack.com/docs
- GitHub Pages Docs: https://docs.github.com/pages

## Next Steps

1. ✅ Set up GitHub Actions workflow
2. ✅ Add Paystack secret
3. ✅ Push to GitHub
4. ⏳ Wait for deployment (2-3 minutes)
5. ✅ Visit your live site!

Your JENGE Impact Fund donation platform will be live and accepting donations in minutes! 🎉
