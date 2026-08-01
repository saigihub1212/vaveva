# VAVEVA - Production Deployment Guide

## 1. Backend Deployment on AWS Lambda (Serverless)

Your backend is pre-configured with **`serverless-http`** and AWS Lambda handler entry point.

### Option A: Serverless Framework CLI
1. Open terminal at `vervo/vaveva/backend`
2. Install Serverless CLI globally (if not installed):
   ```bash
   npm install -g serverless
   ```
3. Configure AWS credentials:
   ```bash
   aws configure
   ```
4. Deploy to AWS Lambda & API Gateway:
   ```bash
   npx serverless deploy
   ```

### Option B: AWS Lambda Console (Zip Upload)
1. Zip the `vervo/vaveva/backend` directory (including `node_modules`, `lambda.js`, and `src/`).
2. Upload zip to your **AWS Lambda Function**.
3. Set **Handler** to `lambda.handler`
4. Set Runtime to **Node.js 18.x** or higher.
5. Add Environment Variables in AWS Lambda Console:
   * `MONGODB_URI`: `mongodb+srv://saikumar:sai2007@newone.aiaojqv.mongodb.net/?appName=newOne`
   * `JWT_SECRET`: `vavevasupersecretkey123456`
   * `NODE_ENV`: `production`
   * `ADMIN_EMAIL`: `admin@vaveva.com`
   * `ADMIN_PASSWORD`: `admin123`
   * `CLOUDINARY_URL`: `cloudinary://546169222394624:lyK-7jBbbU-a7-23vArJpjSx0xg@dqakp8ucr`

---

## 2. Frontend Deployment (Vercel / Netlify)

1. **Root Directory:** `vervo/vaveva/frontend`
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Vercel Routing:** Handled automatically via [vercel.json](file:///c:/Users/pc/Desktop/recap_django/law/sleepnew/vervo/vaveva/frontend/vercel.json).
