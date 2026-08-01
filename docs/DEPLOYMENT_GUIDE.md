# VAVEVA Production Deployment Guide

This guide outlines deployment steps for VAVEVA across Vercel, Render, and MongoDB Atlas.

---

## 1. Database Setup (MongoDB Atlas)
1. Create a MongoDB Atlas Cluster at [mongodb.com](https://www.mongodb.com/).
2. Obtain your Connection String URI:
   `mongodb+srv://<username>:<password>@vaveva-cluster.mongodb.net/vaveva_db?retryWrites=true&w=majority`
3. Whitelist IP `0.0.0.0/0` in Atlas Network Access.

---

## 2. Backend API Deployment (Render)
1. Push the repository to GitHub.
2. Go to [render.com](https://render.com/) and create a **Web Service**.
3. Connect your GitHub repository and specify the **Root Directory**: `server`.
4. Build Command: `npm install`
5. Start Command: `node src/index.js`
6. Environment Variables:
   - `MONGODB_URI`: `<Your MongoDB Atlas URI>`
   - `JWT_SECRET`: `vaveva_production_jwt_secret_key_2026`
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
7. Click **Deploy Web Service**. Your API will be live at `https://vaveva-api.onrender.com`.

---

## 3. Customer Storefront Deployment (Vercel)
1. Go to [vercel.com](https://vercel.com/) and import the project repository.
2. Set **Root Directory**: `client`
3. Framework Preset: **Vite**
4. Environment Variables:
   - `VITE_API_URL`: `https://vaveva-api.onrender.com`
5. Click **Deploy**. Your luxury storefront will be live at `https://vaveva.vercel.app`.

---

## 4. Admin Dashboard Deployment (Vercel)
1. Create a second Vercel Project importing the same repository.
2. Set **Root Directory**: `admin`
3. Framework Preset: **Vite**
4. Environment Variables:
   - `VITE_API_URL`: `https://vaveva-api.onrender.com`
5. Click **Deploy**. Your executive admin center will be live at `https://vaveva-admin.vercel.app`.
