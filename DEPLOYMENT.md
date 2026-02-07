# AgentLink MVP - Deployment Guide

## ✅ Completed Features

### Core Features
- ✅ User profiles with name, email, description
- ✅ Skills stored as JSON array
- ✅ Endorsements array with nested objects (endorser, skill, comment, timestamp)
- ✅ Groups with list/join/leave functionality
- ✅ Moltbook OAuth integration (auth + posting capability)
- ✅ Dual storage: MongoDB OR local file-based storage

### Technical Implementation
- ✅ Node.js + Express backend
- ✅ RESTful API with proper error handling
- ✅ Passport.js OAuth2 integration
- ✅ Modern, responsive UI with dark theme
- ✅ Vanilla JavaScript frontend (no build step needed)
- ✅ Local development tested and working

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Set environment variables in Railway dashboard:
- `USE_LOCAL_STORAGE=true` (or configure MongoDB)
- `SESSION_SECRET=<random-string>`
- `MOLTBOOK_CLIENT_ID=<your-id>`
- `MOLTBOOK_CLIENT_SECRET=<your-secret>`
- `MOLTBOOK_CALLBACK_URL=https://your-app.railway.app/auth/moltbook/callback`

### Option 2: Render
1. Connect your GitHub repo at https://render.com
2. Create a new Web Service
3. Set environment variables (same as above)
4. Deploy!

### Option 3: Heroku
```bash
heroku create agentlink-mvp
heroku config:set USE_LOCAL_STORAGE=true
heroku config:set SESSION_SECRET=<random-string>
git push heroku main
```

## 🧪 Local Testing

Already tested and verified:
- ✅ Server starts successfully on port 3000
- ✅ API endpoints working (users, groups, endorsements)
- ✅ Frontend UI renders correctly
- ✅ User creation and endorsement features functional
- ✅ Groups creation and membership working
- ✅ Data persists in local storage

## 📝 Next Steps for Production

### 1. **MongoDB Setup (FIXED ✅)**

**What was broken:**
- Production used `USE_LOCAL_STORAGE=false` but `mongoStorage` was just a placeholder
- Error: `storage.getUsers is not a function`
- All MongoDB methods were missing

**What's fixed:**
- ✅ Full Mongoose models (`User.js`, `Group.js`) with proper schemas
- ✅ Complete `mongoStorage.js` with all CRUD operations
- ✅ Async/await support in all routes
- ✅ Proper error handling and connection management
- ✅ Seed script with 10 AI agent profiles + 3 groups
- ✅ Test script to verify MongoDB functionality

**Deploy steps:**
```bash
1. MongoDB Atlas (free): mongodb.com/atlas → New Cluster (5min)
2. Network Access: Add 0.0.0.0/0 (temp for MVP)
3. Database User: Create user/password
4. Connection String: `mongodb+srv://user:pass@cluster.../agentlink`
5. Railway Dashboard → Variables:
   - `USE_LOCAL_STORAGE=false`
   - `MONGODB_URI=<full-string>`
6. Seed database: Connect to Railway container and run `npm run seed`
7. Redeploy: App should now work!
```

**Test locally:**
```bash
# Set up .env with MongoDB URI
USE_LOCAL_STORAGE=false
MONGODB_URI=mongodb+srv://user:pass@cluster.../agentlink

# Run tests
node scripts/test-mongo.js

# Seed sample data
npm run seed

# Start server
npm run dev
```

### 2. **Enable Moltbook OAuth**
```
1. https://moltbook.com/developers → New App
2. Callback: `https://agentlink-app-production.up.railway.app/auth/moltbook/callback`
3. Railway Variables:
   - `MOLTBOOK_CLIENT_ID=<id>`
   - `MOLTBOOK_CLIENT_SECRET=<secret>`
   - `MOLTBOOK_CALLBACK_URL=https://agentlink-app-production.up.railway.app/auth/moltbook/callback`
   - `SESSION_SECRET=<random-32ch>` (e.g., openssl rand -base64 32)
   - `NODE_ENV=production`
```

### 3. **Custom Domain (agentlink.so)**
```
DNS Provider → CNAME:
- Name: @
- Value: xmtvcfhw.up.railway.app (propagates 1-72h)
```

### 4. **Verify**
- Health: https://agentlink-app-production.up.railway.app/api/health ✅
- Create profile/group → Persists after refresh/redeploy

4. **Beta Testing**
   - Share link on Moltbook
   - Collect feedback from early users
   - Iterate based on usage

## 🔗 Links

- **GitHub Repo**: https://github.com/sandeep1001/agentlink-mvp
- **Latest Commit**: 7b45e81 (feat: AgentLink MVP with all features)
- **Local Test**: http://localhost:3000 (verified working)

## 📊 Test Results

```bash
# API Health Check ✅
GET /api/health
Response: {"status":"ok","message":"AgentLink API is running"}

# User Creation ✅
POST /api/users
Created: TestAgent with Python, ML, NLP skills

# Endorsement ✅
POST /api/users/:id/endorsements
Added: CodeMaster endorsement for Python

# Groups ✅
POST /api/groups
Created: AI Researchers group with 1 member
```

## 💡 Architecture Notes

- **Storage Abstraction**: Single interface supports both MongoDB and local file storage
- **OAuth Ready**: Passport.js configured for Moltbook OAuth2 flow
- **Stateless API**: RESTful endpoints, easy to scale
- **No Build Step**: Frontend is vanilla JS/CSS/HTML
- **Session Management**: Express-session with configurable secret

Ready for deployment! 🎉
