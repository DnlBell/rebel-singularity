const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class APIClient {
  constructor() {
    this.baseURL = API_URL;
    this.token = this.getTokenFromStorage();
  }

  getTokenFromStorage() {
    return localStorage.getItem('game_auth_token');
  }

  setTokenInStorage(token) {
    if (token) {
      localStorage.setItem('game_auth_token', token);
      this.token = token;
    } else {
      localStorage.removeItem('game_auth_token');
      this.token = null;
    }
  }

  getAuthHeader() {
    if (this.token) {
      return {
        'Authorization': `Bearer ${this.token}`
      };
    }
    return {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.error || 'API request failed'
        };
      }

      return data;
    } catch (err) {
      if (err.status === 401) {
        this.setTokenInStorage(null);
      }
      throw err;
    }
  }

  // Auth endpoints
  async register(email, username, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password })
    });
    this.setTokenInStorage(data.token);
    return data.user;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setTokenInStorage(data.token);
    return data.user;
  }

  async loginWithGoogle(googleId, email, displayName) {
    const data = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ googleId, email, displayName })
    });
    this.setTokenInStorage(data.token);
    return data.user;
  }

  async loginWithGithub(githubId, email, displayName, login) {
    const data = await this.request('/auth/github', {
      method: 'POST',
      body: JSON.stringify({ githubId, email, displayName, login })
    });
    this.setTokenInStorage(data.token);
    return data.user;
  }

  async getCurrentUser() {
    const data = await this.request('/auth/me', {
      method: 'GET'
    });
    return data.user;
  }

  async logout() {
    this.setTokenInStorage(null);
  }

  // Save endpoints
  async saveGame(gameState) {
    const data = await this.request('/api/saves', {
      method: 'POST',
      body: JSON.stringify(gameState)
    });
    return data;
  }

  async getLatestSave() {
    const data = await this.request('/api/saves/latest', {
      method: 'GET'
    });
    return data;
  }

  async getSaves() {
    const data = await this.request('/api/saves', {
      method: 'GET'
    });
    return data.saves;
  }

  async deleteSave(saveId) {
    const data = await this.request(`/api/saves/${saveId}`, {
      method: 'DELETE'
    });
    return data;
  }
}

export default new APIClient();
