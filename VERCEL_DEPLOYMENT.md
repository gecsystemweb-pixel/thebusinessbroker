# Vercel Deployment Guide

This guide explains how to deploy the frontend to Vercel for testing.

## Prerequisites

1. A Vercel account (https://vercel.com)
2. The backend API deployed and accessible (can be on your local machine with ngrok, or any hosted server)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import this GitHub repository: `gecsystemweb-pixel/thebusinessbroker`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend` (Note: vercel.json is now in the frontend directory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.com/api`)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from the frontend directory
cd frontend
vercel

# Follow the prompts to configure:
# - Project name
# - Build command: npm run build
# - Output directory: dist
# - Set VITE_API_URL environment variable
```

## Environment Variables

Required environment variable:

- `VITE_API_URL`: The URL of your backend API
  - Local development: Not needed (uses Vite proxy)
  - Vercel deployment: Set to your backend URL (e.g., `https://your-backend.com/api`)

## Backend Connection Options

### Option A: Use Local Backend with ngrok (for testing)

1. Install ngrok: https://ngrok.com/download
2. Start your Django backend locally:
   ```bash
   cd backend
   .venv\Scripts\activate
   python manage.py runserver
   ```
3. In another terminal, expose it with ngrok:
   ```bash
   ngrok http 8000
   ```
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. Set `VITE_API_URL=https://abc123.ngrok.io/api` in Vercel

### Option B: Deploy Backend to a Cloud Provider

Deploy your Django backend to:
- Railway
- Render
- Heroku
- Google Cloud Run
- Any VPS

Then use that URL for `VITE_API_URL`.

### Option C: Use Production Backend (if already deployed)

If you have the production backend on Google Cloud (as per the README), use its URL for `VITE_API_URL`.

## Important Notes

1. **Backend Required**: The frontend needs a running backend API to function properly
2. **CORS Configuration**: Ensure your Django backend allows requests from your Vercel domain:
   - Add your Vercel domain to `CORS_ALLOWED_ORIGINS` in backend settings
   - Or use wildcard for testing (not recommended for production)

3. **Media Files**: If using local backend with ngrok, media files will be accessible through the ngrok URL

4. **Contact Form**: Enquiries will be sent to the backend. Ensure email notifications are configured if needed.

## Troubleshooting

### API Requests Failing

- Check that `VITE_API_URL` is set correctly in Vercel environment variables
- Verify the backend is running and accessible
- Check browser console for CORS errors
- Ensure backend `CORS_ALLOWED_ORIGINS` includes your Vercel domain

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Check that the build command works locally: `npm run build`
- Review Vercel build logs for specific errors

### Media Files Not Loading

- Verify the backend is serving media files
- Check that the `/media` proxy is working
- Ensure media files exist in the backend `media/` directory

## Production Considerations

For production deployment to Google Cloud (as per the original plan):

1. Use the provided deployment scripts in the `deploy/` directory
2. The backend and frontend will be served from the same origin
3. No need for separate Vercel deployment in production
4. Vercel deployment is intended for testing/staging only
