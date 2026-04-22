# Student Management System - Deployment Guide

This guide provides step-by-step instructions for deploying the Student Management System to Render using both normal and Docker methods.

---

## Prerequisites

- GitHub account with the code pushed to a repository
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)

---

## Environment Variables

### Backend (.env)

```
PORT=3001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-secure-random-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=your-frontend-url
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_BASE_URL=your-backend-url/api
VITE_SOCKET_URL=your-backend-url
```

---

## Method 1: Normal Deployment (Recommended)

### Step 1: Deploy Backend (Web Service)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `student-management-backend`
   - **Root Directory**: `.` (root of repo)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: `Node`

5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `CLOUDINARY_CLOUD_NAME`: From Cloudinary dashboard
   - `CLOUDINARY_API_KEY`: From Cloudinary dashboard
   - `CLOUDINARY_API_SECRET`: From Cloudinary dashboard
   - `FRONTEND_URL`: Your frontend URL (after deployment)
   - `NODE_ENV`: `production`

6. Click **Deploy Web Service**

7. After deployment, note your backend URL (e.g., `https://student-management-backend.onrender.com`)

### Step 2: Deploy Frontend (Static Site)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Static Site**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `student-management-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Node`

5. Add Environment Variables:
   - `VITE_API_BASE_URL`: Your backend URL + `/api` (e.g., `https://student-management-backend.onrender.com/api`)
   - `VITE_SOCKET_URL`: Your backend URL (e.g., `https://student-management-backend.onrender.com`)

6. Click **Deploy Static Site**

7. After deployment, note your frontend URL

### Step 3: Update Backend CORS

1. Go to your backend service on Render
2. Navigate to **Environment**
3. Update `FRONTEND_URL` with your deployed frontend URL
4. Redeploy the backend

---

## Method 2: Docker Deployment

### Step 1: Prepare Docker Files

Ensure you have:
- `Dockerfile` in root (backend)
- `frontend/Dockerfile` (frontend)
- `docker-compose.yml`
- `frontend/nginx.conf`

### Step 2: Deploy Backend with Docker

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Docker Service**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `student-management-backend-docker`
   - **Docker Context**: `.` (root directory)
   - **Dockerfile Path**: `Dockerfile`
   - **Environment Variables** (same as Method 1)

5. Click **Deploy Docker Service**

### Step 3: Deploy Frontend with Docker

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Docker Service**
3. Connect your GitHub repository
4. Configure:

   - **Name**: `student-management-frontend-docker`
   - **Docker Context**: `frontend`
   - **Dockerfile Path**: `Dockerfile`
   - **Environment Variables** (same as Method 1)

5. Click **Deploy Docker Service**

---

## Docker Commands (Local Development)

### Build Images

```bash
# Build backend image
docker build -t student-backend .

# Build frontend image
cd frontend
docker build -t student-frontend .
```

### Run Containers

```bash
# Run backend
docker run -p 3001:3001 --env-file .env student-backend

# Run frontend
docker run -p 80:80 --env-file frontend/.env student-frontend
```

### Use Docker Compose

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up -d --build
```

---

## Common Issues and Fixes

### Issue 1: CORS Errors

**Problem**: Frontend cannot connect to backend due to CORS policy

**Solution**:
1. Ensure `FRONTEND_URL` in backend environment variables matches your frontend URL exactly
2. Wait for backend to redeploy after updating environment variables

### Issue 2: MongoDB Connection Failed

**Problem**: Backend cannot connect to MongoDB Atlas

**Solution**:
1. Whitelist Render's IP addresses in MongoDB Atlas Network Access
2. Use `0.0.0.0/0` (allows all IPs) for testing (not recommended for production)
3. Ensure connection string includes correct authentication database: `?authSource=admin`

### Issue 3: WebSocket Connection Failed

**Problem**: Real-time updates not working

**Solution**:
1. Ensure `VITE_SOCKET_URL` matches backend URL
2. Check that backend is running with WebSocket support
3. Verify CORS allows WebSocket connections

### Issue 4: Image Upload Failed

**Problem**: Cloudinary upload errors

**Solution**:
1. Verify Cloudinary credentials are correct
2. Ensure Cloudinary allows unsigned uploads or use signed uploads
3. Check file size limits (max 5MB)

### Issue 5: Port Conflicts

**Problem**: Docker containers cannot start due to port conflicts

**Solution**:
```bash
# Check what's using the port
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F

# Or use different ports in docker-compose.yml
```

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user:
   - Username: `admin`
   - Password: Generate a strong password
5. Network Access:
   - Add IP: `0.0.0.0/0` (for Render) or specific Render IP ranges
6. Get Connection String:
   - Click **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database password

---

## Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard → Account Details
4. Note down:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
5. These will be used in environment variables

---

## Production Checklist

- [ ] Update all environment variables with production values
- [ ] Use strong JWT_SECRET
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Set NODE_ENV to production
- [ ] Test all features locally before deploying
- [ ] Verify CORS configuration
- [ ] Test WebSocket connections
- [ ] Test file uploads
- [ ] Monitor logs for errors
- [ ] Set up monitoring/alerts (optional)

---

## Monitoring and Logs

### Render Logs

1. Go to your service on Render
2. Click **Logs** tab
3. View real-time logs
4. Filter by level (info, warning, error)

### MongoDB Atlas Monitoring

1. Go to MongoDB Atlas
2. Click **Metrics** tab
3. Monitor:
   - Connection count
   - CPU usage
   - Storage usage
   - Network traffic

---

## Scaling

### Backend Scaling

1. Go to backend service on Render
2. Navigate to **Settings**
3. Adjust **Instances** based on traffic
4. Free tier: 1 instance (512MB RAM)
5. Paid tiers: Multiple instances with load balancing

### Frontend Scaling

Static sites on Render are automatically served via CDN and scale automatically.

---

## Backup and Recovery

### MongoDB Backup

1. MongoDB Atlas provides automated backups (paid tier)
2. Manual backup:
   - Go to MongoDB Atlas
   - Click **Backup** → **Restore**
   - Select snapshot and restore

### Application Backup

- Code is stored in GitHub
- Use git tags for version control
- Environment variables are stored in Render

---

## Cost Estimation

### Free Tier (Render)

- Backend: Free (512MB RAM, 0.1 CPU)
- Frontend: Free (Static site)
- MongoDB Atlas: Free (512MB storage)
- Cloudinary: Free (25GB storage, 25GB bandwidth/month)

### Paid Tier (if needed)

- Backend: $7/month (512MB RAM, 0.5 CPU)
- Frontend: Free (static sites)
- MongoDB Atlas: $57/month (2GB storage, dedicated)
- Cloudinary: $99/month (additional storage/bandwidth)

---

## Support

- Render Documentation: https://render.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Cloudinary Documentation: https://cloudinary.com/documentation
- Socket.IO Documentation: https://socket.io/docs
