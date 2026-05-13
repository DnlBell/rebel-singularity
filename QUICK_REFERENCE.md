# Quick Reference: Commands & Workflows

## Development Workflow

### Start Local Development

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```
Runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```powershell
npm start
```
Runs on `http://localhost:3000`

### Fresh Setup

```powershell
# Backend
cd server
npm install
npm run migrate
npm run dev

# Frontend (in another terminal)
npm install
npm start
```

## Common Commands

### Server Commands
```bash
npm run dev          # Start dev server with auto-reload
npm run start        # Start production server
npm run migrate      # Run database migrations
npm test             # Run tests (if configured)
```

### Frontend Commands
```bash
npm start            # Start dev server
npm build            # Build for production
npm test             # Run tests
npm eject            # Eject from Create React App (⚠️ irreversible)
```

---

## Testing Workflows

### Test User Registration
```bash
# 1. Open http://localhost:3000
# 2. Click "Sign In / Create Account"
# 3. Fill form:
#    Email: test@example.com
#    Username: testuser
#    Password: password123
# 4. Click "Create Account"
# 5. Should see "Logged in as: testuser"
```

### Test Auto-Save
```bash
# 1. After login, click "New Game"
# 2. Create character
# 3. Play 5 turns
# 4. Open DevTools Console (F12)
# 5. Should see: "✓ Game saved to server at turn 5"
# 6. Refresh page
# 7. Redux state should restore to turn 5
```

### Test Save Load
```bash
# 1. From Start page, click "Continue (Turn 5)"
# 2. Game should load at turn 5
# 3. Verify dungeon, player, inventory match
```

### Test Offline Mode
```bash
# 1. DevTools → Network tab → Check "Offline"
# 2. Play 3 more turns
# 3. Console should show: "⚠ Failed to save game to server"
# 4. Game continues normally
# 5. Uncheck "Offline"
# 6. Next turn increment saves with: "✓ Game saved to server"
```

### Test Database
```powershell
# List all users
psql -U postgres -d rebel_singularity -c "SELECT id, email, username, display_name FROM users;"

# List all saves
psql -U postgres -d rebel_singularity -c "SELECT id, user_id, turn_count, last_modified FROM player_saves ORDER BY last_modified DESC;"

# Delete a save (testing)
psql -U postgres -d rebel_singularity -c "DELETE FROM player_saves WHERE id = 1;"
```

---

## Environment Variables

### Server (.env.local)
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rebel_singularity
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
REACT_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Frontend (.env or create-react-app defaults)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Debugging

### Enable Redux DevTools
1. Install Redux DevTools browser extension: https://github.com/reduxjs/redux-devtools-extension
2. Open DevTools (F12 → Redux tab)
3. See all actions, state changes, and time-travel debugging

### Check Server Logs
```bash
# Backend logs appear in Terminal 1
# Look for:
✓ Migrations completed successfully
✓ Server running on http://localhost:5000
✓ Game saved to server at turn X
⚠ Failed to save game to server
```

### Check Browser Console
```javascript
// Frontend logs appear in Console tab (F12)
// Look for:
console.log() calls from middleware
console.error() for fetch failures
Redux action dispatch logs
```

### Database Debugging
```powershell
# Connect to database
psql -U postgres -d rebel_singularity

# Useful queries:
\dt                          # List all tables
SELECT * FROM users;         # Show all users
SELECT * FROM player_saves;  # Show all saves
\l                          # List all databases
\du                         # List all users
```

---

## Stopping Services

### Stop Backend Server
```bash
# Terminal: Ctrl+C
# Or: Kill terminal window
```

### Stop Frontend Dev Server
```bash
# Terminal: Ctrl+C
```

### Stop PostgreSQL (Windows)
```powershell
# Via Services:
services.msc -> PostgreSQL -> Properties -> Stop

# Or via command:
pg_ctl -D "C:\Program Files\PostgreSQL\14\data" stop
```

---

## Resetting Local Development

### Clear Redis Cache / Local Storage
```javascript
// In browser console (F12):
localStorage.clear();  // Clears all localStorage including auth token
location.reload();     // Reload page
```

### Reset Database
```powershell
# DANGER: Deletes all data
dropdb rebel_singularity
createdb rebel_singularity
cd server
npm run migrate
```

### Clear node_modules (if installation broken)
```bash
cd server
rm -r node_modules
npm install
```

---

## Deployment Preview

### Build for Production
```bash
npm run build
```
Creates optimized build in `build/` folder (~200KB)

### Test Production Build Locally
```bash
npm install -g serve
serve -s build
```
Runs on `http://localhost:3000` (production mode)

---

## Git Workflow

### Before Committing
```bash
# See what's changed
git status

# Stage files
git add .

# Commit with message
git commit -m "feat: add user accounts and auto-save"

# Push to GitHub
git push origin main
```

### After Pushing to GitHub
- Railway / Vercel automatically deploys
- Check deployment status in their dashboards
- Monitor logs for errors

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `EADDRINUSE: address already in use :::5000` | Kill process on port 5000: `lsof -i :5000 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| `Module not found: 'pg'` | Run `npm install` in `server/` |
| `ECONNREFUSED 127.0.0.1:5432` | Start PostgreSQL service |
| `JWT malformed` | Delete localStorage.game_auth_token and re-login |
| `CORS error` | Check REACT_APP_URL matches server origin |
| `Cannot find module '@/...'` | Check path is relative, no @ alias in this setup |

---

## IDE Setup (VS Code)

### Useful Extensions
```
ES7+ React/Redux/React-Native snippets
PostgreSQL
Thunder Client (REST API testing)
Redux DevTools
Prettier (code formatter)
```

### Debugging React
1. Install React DevTools: https://react-devtools-tutorial.vercel.app/
2. Open DevTools → Components tab
3. Select components, see props and state

### Debugging Redux
1. Install Redux DevTools Extension
2. Open DevTools → Redux tab
3. Replay actions, see state diff

---

**Last Updated**: May 12, 2026
