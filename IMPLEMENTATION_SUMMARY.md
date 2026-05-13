# Implementation Summary: User Accounts & Game Saves

## What Was Built

A complete user account and game persistence system for Rebel Singularity with the following features:

### Backend (Node.js + Express + PostgreSQL)
- **Authentication System**: Email/password registration and login with JWT tokens
- **Database Schema**: Users and player_saves tables with proper indexing
- **API Endpoints**: 
  - Auth: `/auth/register`, `/auth/login`, `/auth/me`, `/auth/google` (placeholder), `/auth/github` (placeholder)
  - Saves: `POST/GET/DELETE /api/saves`, `GET /api/saves/latest`
- **Middleware**: JWT token validation for protected endpoints
- **Error Handling**: Graceful error messages with proper HTTP status codes

### Frontend (React + Redux)
- **Auth Context**: Global authentication state with user, loading, and error handling
- **API Client**: Fetch wrapper with automatic JWT token injection and localStorage management
- **Login/Register UI**: Combined form for account creation and login with email/password
- **Protected Routes**: Route guard component that redirects to login if not authenticated
- **Auto-Save Middleware**: Redux middleware that saves game state on each turn increment with debouncing
- **Start Page**: Enhanced with user info, continue/new game options, and logout button
- **Game View**: Added user info header with logout button

### Key Features
✅ **Email/Password Auth**: Users can create accounts and sign in  
✅ **Auto-Save**: Game state saved to server after each turn (debounced)  
✅ **Save Restore**: Players can continue from their last save on login  
✅ **Offline Fallback**: Game continues offline; saves queue when reconnected  
✅ **localStorage Backup**: If user not logged in or server unavailable, saves to browser storage  
✅ **JWT Tokens**: 7-day expiring tokens for stateless auth  
✅ **Prepared for OAuth**: Backend endpoints ready for Google/GitHub (placeholder)  

---

## Files Created

### Backend (`server/`)
```
server/
├── package.json                          # Node dependencies
├── .env.example                         # Environment variables template
├── index.js                             # Express app & server entry point
├── middleware/
│   └── authenticateToken.js             # JWT validation middleware
├── routes/
│   ├── auth.js                          # Register, login, OAuth endpoints
│   └── saves.js                         # Game save API endpoints
└── migrations/
    ├── 001_init.sql                     # Database schema (users, saves tables)
    └── run.js                           # Migration runner
```

### Frontend (`src/`)
```
src/
├── App.js                               # UPDATED: Added AuthProvider, ProtectedRoute, middleware
├── api/
│   └── client.js                        # API wrapper with JWT handling
├── auth/
│   └── AuthContext.js                   # Auth provider & useAuth hook
├── components/
│   └── ProtectedRoute.js                # Route guard for authenticated pages
├── middleware/
│   └── savePersistenceMiddleware.js     # Redux middleware for auto-save
└── view/
    ├── Login.js                         # NEW: Login/Register form
    ├── Start.js                         # UPDATED: Added auth flow & save loading
    └── GameView.js                      # UPDATED: Added user info header
```

---

## Files Modified

| File | Changes |
|------|---------|
| **App.js** | Added AuthProvider, ProtectedRoute, savePersistenceMiddleware, compose with Redux DevTools |
| **Start.js** | Complete rewrite: auth-aware, fetch latest save, continue/new game buttons, logout |
| **GameView.js** | Converted to functional component, added user info header with logout |

---

## Testing Checklist

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for step-by-step setup and testing instructions.

### Quick Start
1. Install PostgreSQL (Windows: https://www.postgresql.org/download/windows/)
2. Create database: `createdb rebel_singularity`
3. Setup backend:
   ```bash
   cd server
   cp .env.example .env.local
   # Edit .env.local with your DATABASE_URL
   npm install
   npm run migrate
   npm run dev
   ```
4. In another terminal, start React:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 and test signup/login/game flow

---

## Architecture Decisions Explained

### Why Redux Middleware for Saves?
- Centralizes save logic without modifying game components
- Debounces to prevent save spam (multiple rapid turns)
- Automatically persists Redux state without manual player action
- Graceful fallback to localStorage if user not logged in

### Why Debounce?
- Users might take multiple actions rapidly
- Saves happen on turn increment, which could fire multiple times per second in theory
- 1.5 second debounce balances responsiveness with efficiency
- Batches saves into single API calls

### Offline-First Approach?
- Game never blocks on network requests
- If server is down or user offline, game continues
- localStorage backup ensures no progress loss
- Auto-syncs when connection restored

### Token Storage?
- JWT tokens stored in localStorage for easy API client access
- Avoids need for httpOnly cookies (complex for CORS)
- Tokens expire in 7 days; users re-authenticate on expiry
- Secure for turn-based game (not storing highly sensitive data)

---

## Next Steps

### Before Production
1. ✅ Test locally (see SETUP_GUIDE.md)
2. **Add OAuth** (optional but recommended):
   - Get Google Client ID from https://console.cloud.google.com
   - Get GitHub Client ID from GitHub Settings → Developer Settings
   - Add to server `.env`, uncomment OAuth buttons in Login.js
3. **Environment hardening**:
   - Change `JWT_SECRET` to a strong random string in production
   - Use HTTPS in production (required for OAuth)
4. **Database backups**:
   - Set up automated PostgreSQL backups if self-hosting
   - Use Railway's managed backups if deploying there

### Deployment

**Backend (Node.js + PostgreSQL):**
- Push to GitHub
- Connect to Railway (https://railway.app)
- Set env vars in Railway dashboard
- Railway will auto-deploy on git push

**Frontend (React):**
- Build: `npm run build`
- Deploy to Vercel, Netlify, or Railway
- Update `REACT_APP_API_URL` to production backend URL
- Rebuild and redeploy

### Future Enhancements
- [ ] Multiple save slots (let users save different games)
- [ ] Leaderboard (display top scores)
- [ ] Save export/import (backup saves locally)
- [ ] Session timeout & refresh tokens
- [ ] Two-factor authentication
- [ ] Admin panel for user/save management

---

## Database Schema

### `users` table
```sql
id          BIGINT PRIMARY KEY
email       VARCHAR(255) UNIQUE (required for password auth)
username    VARCHAR(255) UNIQUE
password_hash VARCHAR(255) (bcrypt hash, required for password auth)
display_name VARCHAR(255)
oauth_provider VARCHAR(50) (null unless OAuth user)
oauth_id    VARCHAR(255) (null unless OAuth user)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### `player_saves` table
```sql
id          BIGINT PRIMARY KEY
user_id     BIGINT FOREIGN KEY to users(id)
player_json JSONB (full Redux player object)
dungeon_json JSONB (full Redux dungeon object)
log_json    JSONB (full Redux log array)
turn_count  INTEGER
created_at  TIMESTAMP
last_modified TIMESTAMP
```

---

## Troubleshooting

**"node: command not found"**
- Node.js not installed. Download from https://nodejs.org/

**"EACCES: permission denied" on Windows**
- Run terminal as Administrator

**"ECONNREFUSED" when connecting to database**
- PostgreSQL not running. Start it via Services or `pg_ctl start`

**"ERR_MODULE_NOT_FOUND" for `dotenv`**
- Run `npm install` in `server/` directory

**Token invalid after page refresh**
- Check localStorage has `game_auth_token` key
- Verify JWT_SECRET is correct in both server and client
- Tokens expire after 7 days; users must re-login

**Saves not appearing**
- Check network tab in DevTools (F12) for API response
- Verify user is logged in (localStorage should have token)
- Check PostgreSQL `player_saves` table for entries

---

## Security Notes

This implementation is suitable for a game with 1-10 players. For larger deployments:

- [ ] Add rate limiting to auth endpoints (prevent brute force)
- [ ] Sanitize inputs (prevent SQL injection - currently safe due to prepared statements)
- [ ] Add CORS whitelist (currently allows all origins)
- [ ] Use HTTPS in production (required for secure token transmission)
- [ ] Implement CSRF tokens if adding forms
- [ ] Add password complexity requirements
- [ ] Implement account lockout after failed login attempts
- [ ] Add email verification for new accounts

Current implementation uses parameterized SQL queries (safe from injection) and bcrypt for password hashing (secure).

---

## Cost Estimate (Approximate)

| Component | Tier | Cost |
|-----------|------|------|
| **Railway (Node + Postgres)** | Hobby | $10-15/mo |
| **Vercel (React)** | Pro | $20/mo (optional, free tier available) |
| **Domain** | .com | $12/year |
| **Total** | | ~$30-35/mo startup |

Scaling beyond 10 concurrent users requires moving to Pro tier on Railway ($20+/mo).

---

**Implementation Date**: May 12, 2026  
**Status**: ✅ Complete - Ready for Testing
