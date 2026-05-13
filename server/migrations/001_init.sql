-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  display_name VARCHAR(255),
  oauth_provider VARCHAR(50),
  oauth_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_email_or_oauth CHECK (
    (email IS NOT NULL AND password_hash IS NOT NULL) OR
    (oauth_provider IS NOT NULL AND oauth_id IS NOT NULL)
  )
);

-- Player saves table
CREATE TABLE IF NOT EXISTS player_saves (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_json JSONB NOT NULL,
  dungeon_json JSONB NOT NULL,
  log_json JSONB NOT NULL,
  turn_count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_oauth ON users(oauth_provider, oauth_id);
CREATE INDEX IF NOT EXISTS idx_player_saves_user_id ON player_saves(user_id);
CREATE INDEX IF NOT EXISTS idx_player_saves_user_created ON player_saves(user_id, created_at DESC);
