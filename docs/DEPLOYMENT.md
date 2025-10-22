# Deploy Static HTML to GitHub Pages

This guide shows how to deploy the JENGE Impact Fund static HTML website to GitHub Pages.

## ✅ What's Ready

Your static HTML files are complete and include:
- ✅ JENGE Kulture branding (coral #FF5757, dark brown #24190A, gold #FAAF14)
- ✅ WCAG AA accessibility compliance (≥4.5:1 contrast)
- ✅ Paystack payment integration
- ✅ Responsive design
- ✅ All 3 pages: Home, About, Donate

## 🚀 Quick Deploy (3 Steps)

### Step 1: Add Your Paystack Public Key

Open `docs/donate.html` and replace the placeholder key on **line 437**:

```javascript
// BEFORE:
key: 'pk_test_xxxxx', // Replace with your Paystack public key

// AFTER (use your actual key):
key: 'pk_live_xxxxxxxxxxxxx', // Your Paystack public key
```

**Where to get your key:**
1. Log in to [Paystack Dashboard](https://dashboard.paystack.com)
2. Go to Settings → API Keys & Webhooks
3. Copy your **Public Key** (starts with `pk_live_` or `pk_test_`)

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Click **Save**

### Step 3: Visit Your Site

Your site will be live in 1-2 minutes at:
```
https://yourusername.github.io/your-repo-name/
```

## 📁 File Structure

```
docs/
├── index.html          # Home page (landing page)
├── about.html          # About/Mission page
├── donate.html         # Donation page with Paystack
├── logo.png           # JENGE Kulture logo
├── favicon.ico        # Site favicon
└── preview-index.html # Preview navigation (optional)
```

## 🔧 How Paystack Works

The static site uses **Paystack Inline (Popup)**:

1. User fills donation form
2. Clicks "Donate Now" button
3. Paystack payment popup appears
4. User completes payment
5. Success/failure message shown
6. Transaction tracked in Paystack Dashboard

**No backend required** - all payments go directly through Paystack.

## 📊 Campaign Stats

The static files show hardcoded stats. To update:

1. Open `docs/index.html`
2. Find the progress tracker section (around line 165)
3. Update the values:

```html
<div class="stat-number">KES 1,520,000</div>  <!-- Update amount -->
<div class="stat-label">Pledged of KES 20M Milestone</div>
```

## 🌐 Custom Domain (Optional)

### For subdomain (donate.jengekulture.org):

1. Create `docs/CNAME` file with your domain:
   ```
   donate.jengekulture.org
   ```

2. Add DNS record at your domain provider:
   ```
   Type: CNAME
   Host: donate
   Value: yourusername.github.io
   ```

3. Enable HTTPS in GitHub Pages settings
4. Wait 24 hours for DNS propagation

## 🔒 Security Notes

### Live vs Test Mode

- **Test mode**: Use `pk_test_xxxxx` for testing (no real money)
- **Live mode**: Use `pk_live_xxxxx` for real donations

### Public Key Safety

✅ Public keys are safe to include in static HTML
❌ NEVER include secret keys in frontend code

## 🐛 Troubleshooting

**Payment popup doesn't appear:**
- Check browser console for errors
- Verify Paystack public key is correct
- Ensure key starts with `pk_live_` or `pk_test_`

**Pages show 404:**
- Ensure GitHub Pages folder is set to `/docs`
- Check that files are in the `docs` folder
- Wait 1-2 minutes for deployment

**Stats not updating:**
- Static files require manual updates
- Edit HTML directly and push changes
- Consider upgrading to dynamic backend for auto-updates

## 📱 Testing Before Deploy

Test locally using the preview route:
1. Run `npm run dev` on Replit
2. Visit `/preview` to see the static pages
3. Test navigation and forms
4. Once satisfied, deploy to GitHub Pages

## 🎉 You're Done!

Your JENGE Impact Fund donation platform is now live and ready to accept donations through Paystack!

## 📞 Support

- **Paystack Help**: https://paystack.com/docs
- **GitHub Pages**: https://docs.github.com/pages
- **JENGE Support**: Contact your administrator

---

**Made with ❤️ for JENGE Impact Fund**
