# 🚀 Deployment Pipeline Setup Guide

This guide will help you configure the complete testing and production deployment pipeline.

## 🔧 Required GitHub Secrets

Add these secrets in your main repository (`NAVADA_Device`) settings:

### 1. TESTING_REPO_TOKEN
```bash
# Create a Personal Access Token with 'repo' scope
# GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
# Scopes needed: repo, workflow
```

### 2. ANTHROPIC_API_KEY
```bash
# Your Claude API key for the staging environment
# Same key you use for production, or create a separate testing key
```

## 📝 Setup Steps

### Step 1: Configure GitHub Secrets
1. Go to https://github.com/leeakpareva/NAVADA_Device/settings/secrets/actions
2. Add `TESTING_REPO_TOKEN` with your Personal Access Token
3. Add `ANTHROPIC_API_KEY` with your Claude API key

### Step 2: Connect Testing Repo to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import `NAVADA_Device_Testing` repository
4. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`

### Step 3: Configure Vercel Environment Variables
In your Vercel project settings, add:
- `ANTHROPIC_API_KEY`: Your Claude API key
- `NODE_ENV`: `production`

### Step 4: Test the Pipeline
1. Make a change in the main repository
2. Switch to `staging` branch: `git checkout staging`
3. Merge your changes: `git merge master`
4. Push: `git push origin staging`
5. Watch the GitHub Action deploy to testing repo
6. Verify the staging site works correctly

## 🔄 Workflow Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Development    │───▶│   staging        │───▶│  Testing Repo   │
│  (main repo)    │    │   branch         │    │  (auto-deploy)  │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│  Production     │◀───│   Manual         │◀───│  Vercel         │
│  (Vercel)       │    │   Promotion      │    │  Staging        │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 Usage Instructions

### For New Features:
1. Develop on `master` branch
2. When ready for testing: `git checkout staging && git merge master && git push`
3. Automatic deployment to testing environment
4. Test thoroughly on staging URL
5. Manually promote to production in Vercel when satisfied

### For Hotfixes:
1. Create fix on `master`
2. Follow same staging process
3. Emergency deploy directly to production if critical

## 🔗 URLs

- **Staging**: https://navada-testing.vercel.app
- **Production**: https://navada.vercel.app (you control this)
- **Testing Repo**: https://github.com/leeakpareva/NAVADA_Device_Testing

## ⚡ Benefits

✅ **Safe Production**: Nothing goes live without your approval
✅ **Automatic Testing**: Every change is automatically deployed to staging
✅ **Easy Rollback**: Quick revert if issues are found
✅ **Clean Separation**: Testing and production environments are isolated
✅ **Full Control**: You decide when staging promotes to production

---

*This pipeline ensures your production environment stays stable while allowing rapid testing of new features.*