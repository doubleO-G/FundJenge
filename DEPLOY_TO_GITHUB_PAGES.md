# Deploy JENGE Donation Platform to GitHub Pages

This guide will help you deploy your donation platform to GitHub Pages for free hosting.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name your repository: `jenge-donation-platform` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **DON'T** initialize with README (we already have files)
5. Click "Create repository"

## Step 2: Update the Base Path

If you named your repository something different than `jenge-donation-platform`, you need to update `vite.config.ts`:

```typescript
base: process.env.GITHUB_PAGES ? "/YOUR-REPO-NAME-HERE/" : "/",
```

Replace `YOUR-REPO-NAME-HERE` with your actual repository name.

## Step 3: Push Your Code to GitHub

Open your terminal/command line in this project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - JENGE donation platform"

# Add your GitHub repository as remote (replace USERNAME and REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Add Your Paystack API Key to GitHub Secrets

**Important:** Your Paystack key needs to be added to GitHub Secrets for security.

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `VITE_PAYSTACK_PUBLIC_KEY`
5. Value: Your Paystack public key (`pk_test_294d8a56f9cc0c050d05dae1d0c5434e84d126bb`)
6. Click **Add secret**

## Step 5: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Click **Save**

## Step 6: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-5 minutes)
4. Once done, your site will be live!

## Your Live Site URL

Your site will be available at:
```
https://YOUR-USERNAME.github.io/jenge-donation-platform/
```

Replace `YOUR-USERNAME` with your GitHub username.

## Testing Locally for GitHub Pages

Before pushing, you can test the GitHub Pages build locally:

```bash
npm run build:gh-pages
```

This will create a `dist/public` folder with your static files.

## Updating Your Site

Every time you push changes to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site!

```bash
git add .
git commit -m "Update donation platform"
git push
```

## Troubleshooting

### Site shows 404 error
- Check that GitHub Pages is enabled in Settings → Pages
- Verify the base path in `vite.config.ts` matches your repo name
- Make sure the workflow completed successfully in the Actions tab

### Paystack not working
- Verify `VITE_PAYSTACK_PUBLIC_KEY` is added to GitHub Secrets
- Check the Actions tab to see if the build logs show any errors
- Make sure the secret name is exactly: `VITE_PAYSTACK_PUBLIC_KEY`

### Images or assets not loading
- Check that all asset paths use the `@assets/...` import syntax
- Verify the base path is correctly set in `vite.config.ts`

## Custom Domain (Optional)

If you want to use your own domain (like www.jenge.org):

1. In Settings → Pages, add your custom domain
2. Update your DNS records to point to GitHub Pages
3. Remove the `base` configuration from `vite.config.ts` (or set it to `"/"`)

## Support

If you run into issues, check the GitHub Actions logs in the Actions tab for detailed error messages.

---

**Your JENGE Impact Fund donation platform is now ready to accept donations from around the world! 🎉**
