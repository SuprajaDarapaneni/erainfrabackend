# ERA INFRA DEVELOPERS - Standalone Backend API

This folder contains the complete, standalone Express + TypeScript API backend for the **ERA INFRA DEVELOPERS** website. It is designed to be easily deployed to **Render** (or any other Node.js hosting platform) and connect dynamically to your **Google Cloud / Firebase Firestore** database.

---

## 🚀 Easy Deployment to Render

To host this backend on Render, follow these simple steps:

### 1. Push to GitHub
If your project is not already on GitHub:
1. Initialize a new git repository inside this `/backend` directory (or push the entire project repository if it contains the `/backend` folder).
2. Push your code to your GitHub repository.

### 2. Create a Web Service on Render
1. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following parameters:
   - **Name**: `era-infra-backend` (or any name you prefer)
   - **Language**: `Node`
   - **Root Directory**: `backend` (this ensures Render builds only this backend folder!)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

---

## 🔒 Configuration (Environment Variables)

Add the following environment variables under the **Environment** tab in your Render Web Service dashboard:

| Variable Name | Description | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | The port the server binds to | `3000` (Render binds this automatically) |
| `ADMIN_EMAIL` | Master login email for the admin portal | `admin@erainfra.com` |
| `ADMIN_PASSWORD` | Master login password for the admin portal | `your-secure-password` |
| `FIREBASE_SERVICE_ACCOUNT` | Your Google Cloud / Firebase Service Account JSON credentials | *Paste the JSON string directly* or base64-encoded |

### How to get your `FIREBASE_SERVICE_ACCOUNT` credentials:
1. Go to the **[Google Cloud Console](https://console.cloud.google.com/)** or **[Firebase Console](https://console.firebase.google.com/)**.
2. Go to **Project Settings > Service Accounts**.
3. Click **Generate New Private Key**. This downloads a `.json` file.
4. Open the downloaded JSON file, copy its entire text content, and paste it directly as the value of `FIREBASE_SERVICE_ACCOUNT` in your Render dashboard environment variables!

---

## 🔗 Hooking up Vercel Frontend

When you deploy your frontend to Vercel, simply define the API Base environment variable:

1. In your **Vercel Project Dashboard**, go to **Settings > Environment Variables**.
2. Add a new variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-render-app-url.onrender.com` (your deployed Render API address)
3. Redeploy your frontend on Vercel to apply the changes.

The frontend is programmed to intercept all outgoing API requests and route them automatically to your backend URL!
