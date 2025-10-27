# How to Change Paystack Codes on GitHub

## 📍 Where to Find Paystack Configuration

Your Paystack public key is used in the following file:
- **File**: `client/src/pages/donate.tsx`
- **Line**: Look for `import.meta.env.VITE_PAYSTACK_PUBLIC_KEY`

## 🔑 Setting Up Paystack Keys on GitHub

### Step 1: Get Your Paystack Keys
1. Log into your [Paystack Dashboard](https://dashboard.paystack.com/)
2. Go to **Settings** → **API Keys & Webhooks**
3. Copy your **Public Key** (starts with `pk_live_` or `pk_test_`)

### Step 2: Add Paystack Key to GitHub Secrets

1. **Go to your GitHub repository**: `https://github.com/doubleO-G/FundJenge`

2. **Navigate to Settings**:
   - Click on the **Settings** tab (at the top right of your repo)

3. **Add Repository Secret**:
   - In the left sidebar, click **Secrets and variables** → **Actions**
   - Click the **New repository secret** button
   - Add the following secret:
     - **Name**: `VITE_PAYSTACK_PUBLIC_KEY`
     - **Value**: Your Paystack public key (e.g., `pk_live_xxxxxxxxxxxxx`)
   - Click **Add secret**

### Step 3: Verify GitHub Actions Workflow

Your `.github/workflows/deploy.yml` file should already be configured to use this secret. Make sure it includes:

```yaml
env:
  VITE_PAYSTACK_PUBLIC_KEY: ${{ secrets.VITE_PAYSTACK_PUBLIC_KEY }}
```

This will automatically inject your Paystack key during the build process on GitHub Pages.

## 🔒 Important Security Notes

### ✅ DO:
- ✅ Store your **Public Key** in GitHub Secrets as `VITE_PAYSTACK_PUBLIC_KEY`
- ✅ Use `pk_test_` keys for testing
- ✅ Use `pk_live_` keys for production (live website)

### ❌ DON'T:
- ❌ **NEVER** commit your Paystack keys directly in your code
- ❌ **NEVER** use `VITE_` prefix for your **Secret Key**
- ❌ **NEVER** share your Secret Key publicly

## 🔄 Updating Paystack Keys

To change your Paystack key on GitHub:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Find `VITE_PAYSTACK_PUBLIC_KEY` in the list
3. Click **Update** (pencil icon)
4. Paste your new Paystack public key
5. Click **Update secret**
6. The next deployment will automatically use the new key

## 🚀 After Setting Up

Once you've added the secret to GitHub:
1. Make any small change to your code (or just re-run the workflow)
2. Push to GitHub
3. GitHub Actions will automatically rebuild and deploy with your Paystack key
4. Your live site at `https://doubleo-g.github.io/FundJenge/` will use the new key

## 📝 Quick Reference

| Environment | Key Type | Format | Where to Set |
|-------------|----------|--------|--------------|
| Local Development (Replit) | Public Key | `pk_test_xxxx` | Replit Secrets → `VITE_PAYSTACK_PUBLIC_KEY` |
| Production (GitHub Pages) | Public Key | `pk_live_xxxx` | GitHub Secrets → `VITE_PAYSTACK_PUBLIC_KEY` |

## 🆘 Troubleshooting

**Problem**: Payments not working on GitHub Pages
- **Solution**: Make sure you've added `VITE_PAYSTACK_PUBLIC_KEY` to GitHub Secrets

**Problem**: Getting "pk_test_xxxxx" error on live site
- **Solution**: You forgot to add the secret to GitHub. Follow Step 2 above.

**Problem**: Need to switch from test to live keys
- **Solution**: Update the `VITE_PAYSTACK_PUBLIC_KEY` secret in GitHub with your `pk_live_` key

---

## 📧 Need Help?

If you have issues with Paystack integration:
- [Paystack Documentation](https://paystack.com/docs)
- [Paystack Support](https://paystack.com/contact)
