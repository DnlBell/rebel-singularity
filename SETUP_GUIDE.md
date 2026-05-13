# Rebel Singularity - User Accounts & Game Saves Setup

## Backend Setup (Node.js + PostgreSQL)

### Prerequisites

1. **PostgreSQL** (version 12+)
   - Windows: Download from https://www.postgresql.org/download/windows/
   - During installation, note the password for the `postgres` user
   - Install pgAdmin4 (included) for easy database management

2. **Node.js** (version 14+)
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

### Step 1: Create PostgreSQL Database

Using pgAdmin4 (or `psql` command line):

```sql
-- Connect as postgres user, then run:
CREATE DATABASE rebel_singularity;
```

Or via command line:
```bash
createdb rebel_singularity
```

### Step 2: Setup Backend Server

```bash
# Navigate to server directory
cd server

# Create .env.local file with database connection
# Copy from .env.example and fill in your DATABASE_URL:
# DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rebel_singularity

# Install dependencies
npm install

# Run database migrations (creates tables)
npm run migrate

# Start server in development mode
npm run dev
```

Server should start on `http://localhost:5000`

Check health: `curl http://localhost:5000/health`

### Step 3: Setup Frontend (React)

In the main project directory (parallel terminal):

```bash
# Install any new dependencies
npm install reactstrap@8.0.0  # Already there, but ensure it's installed

# Create .env file in src/ (if needed)
# REACT_APP_API_URL=http://localhost:5000

# Start React app
npm start
```

App will start on `http://localhost:3000`

### Step 4: Manual Testing

#### Test 1: User Registration
1. Nav to `http://localhost:3000`
2. Click "Sign In / Create Account"
3. Fill in: 
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Create Account"
5. Should redirect to Start page, showing "Logged in as: testuser"

#### Test 2: User Login
1. Click "Logout"
2. Click "Sign In / Create Account"
3. Toggle to "Sign In" mode
4. Enter email and password from Test 1
5. Should log in successfully

#### Test 3: New Game (Auto-Save)
1. After login, click "New Game"
2. Create a character (any class)
3. Play 5 turns (any actions)
4. Refresh the page (press F5)
5. **IMPORTANT**: Redux state should persist due to middleware
6. Check browser console: "Game saved to server at turn 5" (or similar)

#### Test 4: Game Load (Save Restore)
1. Go back to Start page (`http://localhost:3000`)
2. Should see "Continue (Turn 5)" button
3. Click Continue
4. Game should restore to turn 5 with all state intact

#### Test 5: Offline Fallback
1. Open browser DevTools (F12)
2. Go to Network tab
3. Check "Offline" mode
4. Play 3 more turns (6→9)
5. Console should show "Failed to save game to server"
6. Turns still work locally (localStorage fallback)
7. Uncheck "Offline"
8. Next turn should sync to server
9. Refresh page → should load from server

#### Test 6: Database Verification
Using pgAdmin4 or psql:
```sql
SELECT * FROM users;
SELECT * FROM player_saves;
```

Should see:
- 1 user row with email, username, password_hash
- Multiple save rows with player_json, dungeon_json, etc.

### Troubleshooting

**"Connection refused" error:**
- PostgreSQL not running? 
  - Windows: Start PostgreSQL service: `Services` → find PostgreSQL → right-click → Start
  - Or: `pg_ctl -D "C:\Program Files\PostgreSQL\14\data" start` (adjust path)

**"No such file or directory" for migration:**
- Make sure you're in `server/` directory
- Check `migrations/001_init.sql` exists

**"Module not found" in server:**
- Run `npm install` in `server/` directory
- Check Node version with `node --version`

**React app not connecting to API:**
- Check that server is running on port 5000
- Check browser console for fetch errors
- Verify REACT_APP_API_URL in .env (or defaults to http://localhost:5000)

**"Invalid or expired token" on API calls:**
- Token expires after 7 days
- Delete `game_auth_token` from localStorage and re-login

### Next Steps (After Testing)

1. **Deploy Backend:**
   - Push code to GitHub
   - Connect to Railway (https://railway.app)
   - Link GitHub repo in Railway dashboard
   - Set environment variables in Railway
   - Deploy with `npm run migrate && npm start`

2. **Point React to Production:**
   - Update REACT_APP_API_URL to Railway production URL
   - Redeploy React (Vercel, Netlify, or Railway)

3. **Enable OAuth (Optional):**
   - Get Google OAuth credentials from https://console.cloud.google.com
   - Get GitHub OAuth credentials from GitHub Settings
   - Add to server .env
   - Uncomment OAuth buttons in Login.js

---

**Questions?** Check server logs with `npm run dev` for detailed errors.
