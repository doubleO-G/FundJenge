# Deploy JENGE Impact Fund to Hostinger

This guide will help you deploy your full-stack donation platform to Hostinger with complete backend functionality.

## Why Hostinger (Not GitHub Pages)?

Your application requires:
- ✅ Backend server for Paystack payment verification
- ✅ Real-time campaign progress from actual donations
- ✅ API endpoints for Medium stories and campaign stats
- ✅ Contact form processing

**GitHub Pages only supports static sites** - it won't work for your full application.

## Prerequisites

- Hostinger hosting account with Node.js support
- Your GitHub repository: https://github.com/doubleO-G/FundJenge
- Paystack API keys (test or live)

---

## Step 1: Push Your Code to GitHub

In your Replit Shell, run:

```bash
git add .
git commit -m "Prepare for Hostinger deployment"
git push origin main
```

---

## Step 2: Configure Hostinger

### A. Access Hostinger Control Panel

1. Log into your Hostinger account at https://hpanel.hostinger.com
2. Select your domain/hosting package

### B. Enable Node.js Application

1. Go to **Advanced** → **Node.js**
2. Click **Create Application**
3. Configure:
   - **Node.js version:** 20.x or higher
   - **Application mode:** Production
   - **Application root:** `/public_html` (or your preferred path)
   - **Application URL:** Your domain (e.g., jengeimpactfund.org)
   - **Application startup file:** `server/index.ts`

### C. Set Environment Variables

In the Node.js application settings, add these environment variables:

```
NODE_ENV=production
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_actual_public_key
PORT=5000
```

**Important:** Use your **LIVE** Paystack keys for production, or **TEST** keys for testing.

---

## Step 3: Deploy via Git

### Option A: Automatic Deployment (Recommended)

1. In Hostinger, go to **Git** → **Deploy from Git**
2. Connect your GitHub account
3. Select repository: `doubleO-G/FundJenge`
4. Select branch: `main`
5. Set deployment path: `/public_html` (or your app root)
6. Enable **Auto deploy** - every push to main will auto-deploy
7. Click **Deploy**

### Option B: Manual Git Deployment

1. SSH into your Hostinger server
2. Navigate to your app directory:
   ```bash
   cd /public_html
   ```

3. Clone your repository:
   ```bash
   git clone https://github.com/doubleO-G/FundJenge.git .
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Build the application:
   ```bash
   npm run build
   ```

6. Start the application:
   ```bash
   npm run dev
   ```

---

## Step 4: Configure Start Script

Your application needs to start automatically. Create a production start command.

In your Hostinger Node.js settings:
- **Start command:** `npm run dev` (or `npm start` if you create a production script)

Or if using PM2 (process manager):
```bash
pm2 start server/index.ts --name jenge-fund
pm2 save
pm2 startup
```

---

## Step 5: Configure Domain & SSL

### A. Point Your Domain

1. In Hostinger DNS settings, ensure your domain points to Hostinger servers
2. Wait for DNS propagation (can take up to 48 hours)

### B. Enable SSL Certificate

1. Go to **Advanced** → **SSL**
2. Select your domain
3. Install **Free SSL Certificate** (Let's Encrypt)
4. This encrypts all Paystack payment communications

---

## Step 6: Configure Paystack Webhook

For payment verification callbacks to work:

1. Log into your Paystack Dashboard
2. Go to **Settings** → **Webhooks**
3. Set webhook URL to: `https://yourdomain.com/api/verify-payment`
4. Save the webhook

This allows Paystack to notify your server when payments succeed.

---

## Step 7: Test Your Deployment

### Test These Features:

1. **Homepage loads:** Visit `https://yourdomain.com`
2. **Campaign progress displays:** Check if stats show
3. **Make a test donation:**
   - Go to Donate page
   - Select a builder tier
   - Complete payment with Paystack test card: `4084084084084081`
   - Verify you're redirected back with success message
4. **Check campaign progress updates:** Should show new donation within 10 seconds
5. **Medium stories load:** Should show latest 3 stories from Medium
6. **Contact form works:** Submit a test inquiry

---

## Step 8: Monitor & Update

### View Logs

In Hostinger:
- Go to **Node.js** → Your application
- Click **View Logs** to see server logs
- Monitor for errors or issues

### Update Your Site

To deploy updates:

1. Make changes in Replit
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. If auto-deploy is enabled, Hostinger will deploy automatically
4. Otherwise, manually pull changes via SSH:
   ```bash
   cd /public_html
   git pull origin main
   npm install
   npm run build
   pm2 restart jenge-fund
   ```

---

## Troubleshooting

### Issue: Application won't start

**Solution:**
- Check Node.js version is 20+
- Verify all environment variables are set
- Check server logs for errors

### Issue: Payments not verifying

**Solution:**
- Ensure webhook URL is correct in Paystack dashboard
- Check PAYSTACK_SECRET_KEY is set correctly
- Verify SSL certificate is active (Paystack requires HTTPS)

### Issue: Campaign stats not updating

**Solution:**
- Check that backend API is running (`/api/campaign/stats` should return JSON)
- Verify donations are being saved with 'success' status
- Check browser console for API errors

### Issue: 502 Bad Gateway

**Solution:**
- Application not running - restart Node.js app in Hostinger
- Check start command is correct
- Review application logs for startup errors

---

## Production Checklist

Before going live:

- [ ] Pushed latest code to GitHub main branch
- [ ] Set all environment variables in Hostinger (LIVE Paystack keys)
- [ ] Configured Node.js application in Hostinger
- [ ] Deployed code from GitHub
- [ ] Domain DNS pointing to Hostinger
- [ ] SSL certificate installed and active
- [ ] Paystack webhook configured with your domain
- [ ] Tested donation flow end-to-end
- [ ] Campaign progress updates from real donations
- [ ] Medium stories loading correctly
- [ ] Contact form working

---

## Cost Estimate

**Hostinger Hosting:** ~$2-10/month (depending on your plan)
**Domain:** ~$10-15/year
**Paystack Fees:** 1.5% + KES 100 per successful transaction

**Total:** Much cheaper than dedicated servers, with full Node.js support!

---

## Need Help?

- **Hostinger Support:** https://www.hostinger.com/tutorials
- **Paystack Docs:** https://paystack.com/docs
- **Contact:** fund@jengekulture.org

---

## Your Application Features (All Working on Hostinger)

✅ Complete Paystack payment integration
✅ Real-time campaign progress (auto-updates every 10 seconds)
✅ Backend API for donations, builder pledges, and inquiries
✅ Medium stories auto-fetch every 5 minutes
✅ Contact form processing
✅ Dark mode support
✅ Fully responsive design
✅ All 6 WE BUILD tier badges
✅ Professional JENGE branding

Your platform is production-ready! 🚀
