# JENGE Impact Fund - Deployment Checklist

## Step-by-Step Guide for Hostinger Deployment

Follow these steps in order. Check off each one as you complete it.

---

## Phase 1: Prepare Your Code (Do This Now in Replit)

- [ ] **1.1** Push your code to GitHub
  ```bash
  git add .
  git commit -m "Ready for Hostinger deployment"
  git push origin main
  ```

- [ ] **1.2** Verify push was successful
  - Visit: https://github.com/doubleO-G/FundJenge
  - Confirm you see the latest code

---

## Phase 2: Hostinger Setup

- [ ] **2.1** Log into Hostinger
  - Go to: https://hpanel.hostinger.com
  - Use your Hostinger account credentials

- [ ] **2.2** Create Node.js Application
  - Click **Advanced** → **Node.js**
  - Click **Create Application**
  
- [ ] **2.3** Configure Application Settings
  - **Node.js version:** Select 20.x or higher
  - **Application mode:** Production
  - **Application root:** `/public_html` (or your domain folder)
  - **Application URL:** Your domain (e.g., jengeimpactfund.org)
  - **Application startup file:** `server/index.ts`
  - **Run command:** `npm run dev`

---

## Phase 3: Set Environment Variables in Hostinger

- [ ] **3.1** In Node.js app settings, add these environment variables:

  ```
  NODE_ENV=production
  PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
  VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
  PORT=5000
  ```

  **Where to find your Paystack keys:**
  1. Log into https://dashboard.paystack.com
  2. Go to Settings → API Keys & Webhooks
  3. Copy your LIVE keys (or TEST keys for testing)

- [ ] **3.2** Save environment variables

---

## Phase 4: Deploy from GitHub

- [ ] **4.1** Connect GitHub to Hostinger
  - In Hostinger, go to **Git** section
  - Click **Deploy from Git**
  - Authorize GitHub access

- [ ] **4.2** Select Your Repository
  - Repository: `doubleO-G/FundJenge`
  - Branch: `main`
  - Deployment path: `/public_html` (or your app root)

- [ ] **4.3** Enable Auto-Deploy (Optional but Recommended)
  - ✅ Enable "Auto deploy on push to main"
  - This means future updates automatically deploy when you push to GitHub

- [ ] **4.4** Click **Deploy Now**
  - Wait for deployment to complete (5-10 minutes)
  - Watch the deployment logs for any errors

---

## Phase 5: Configure Domain & SSL

- [ ] **5.1** Point Your Domain
  - If you haven't already, make sure your domain points to Hostinger
  - In Hostinger DNS settings, verify nameservers

- [ ] **5.2** Install SSL Certificate
  - Go to **SSL** in Hostinger
  - Select your domain
  - Click **Install Free SSL Certificate**
  - Wait for activation (instant to 5 minutes)

---

## Phase 6: Configure Paystack Webhook

- [ ] **6.1** Log into Paystack Dashboard
  - Go to: https://dashboard.paystack.com
  - Navigate to **Settings** → **Webhooks**

- [ ] **6.2** Add Your Webhook URL
  - Webhook URL: `https://yourdomain.com/api/verify-payment`
  - Replace `yourdomain.com` with your actual domain
  - Click **Save**

  **Important:** This allows Paystack to notify your server when payments succeed!

---

## Phase 7: Test Everything

- [ ] **7.1** Visit Your Website
  - URL: `https://yourdomain.com`
  - Verify homepage loads correctly

- [ ] **7.2** Test Campaign Progress
  - Check if stats display (should show KES 35,000, 2 builders)
  - Wait 10 seconds, verify it's updating

- [ ] **7.3** Test Donation Flow (CRITICAL)
  1. Go to Donate page
  2. Select any Builder tier
  3. Fill in test details:
     - Email: your-email@example.com
     - Use Paystack test card: **4084 0840 8408 4081**
     - CVV: 408
     - Expiry: Any future date
  4. Complete payment
  5. Verify you're redirected back with success message
  6. Check campaign progress updates (should increase)

- [ ] **7.4** Test Medium Stories
  - Stories should load on homepage
  - Should show latest 3 from https://medium.com/jengestories

- [ ] **7.5** Test Contact Form
  - Submit a test inquiry
  - Verify no errors

- [ ] **7.6** Test Dark Mode
  - Toggle dark/light mode
  - Verify everything looks good in both modes

---

## Phase 8: Go Live (Switch to Live Mode)

Once all tests pass with TEST keys:

- [ ] **8.1** Update Environment Variables to LIVE Keys
  - In Hostinger, update:
    ```
    PAYSTACK_SECRET_KEY=sk_live_your_real_live_key
    VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_real_live_key
    ```

- [ ] **8.2** Update Paystack Webhook to LIVE
  - In Paystack Dashboard, switch to LIVE mode
  - Update webhook URL in LIVE settings

- [ ] **8.3** Restart Your Application
  - In Hostinger Node.js panel, click **Restart**

- [ ] **8.4** Make a Real Test Donation
  - Use a small amount (e.g., KES 100)
  - Use a real payment method
  - Verify everything works end-to-end

---

## Phase 9: Ongoing Maintenance

### To Update Your Site:

1. Make changes in Replit
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your update description"
   git push origin main
   ```
3. If auto-deploy is enabled, changes deploy automatically
4. If not, manually trigger deploy in Hostinger Git panel

### To Monitor Your Site:

- [ ] Check logs regularly in Hostinger → Node.js → View Logs
- [ ] Monitor Paystack dashboard for successful transactions
- [ ] Update campaign stats appear automatically from real donations

---

## Troubleshooting

**Issue: Site won't load**
- Check Node.js app is running in Hostinger
- Verify domain DNS is correct
- Check SSL certificate is active

**Issue: Payments not working**
- Verify Paystack keys are correct (LIVE vs TEST)
- Check webhook URL is set in Paystack
- Ensure SSL certificate is active (Paystack requires HTTPS)
- Review server logs for errors

**Issue: Campaign stats not updating**
- Test the API directly: `https://yourdomain.com/api/campaign/stats`
- Should return JSON with pledged amount and builders
- Check server logs for API errors

**Need Help?**
- Read: HOSTINGER_DEPLOY.md (full guide)
- Hostinger Support: https://www.hostinger.com/tutorials
- Email: fund@jengekulture.org

---

## Success Criteria

Your deployment is successful when:

✅ Website loads at your domain with SSL (https://)
✅ All pages render correctly (Home, About, Donate)
✅ Campaign progress shows and updates from real donations
✅ Test donation completes successfully through Paystack
✅ Campaign stats increase after test donation
✅ Medium stories load automatically
✅ Contact form works
✅ Dark mode toggle works
✅ Site is responsive on mobile and desktop

**Congratulations! Your JENGE Impact Fund platform is live! 🎉**
