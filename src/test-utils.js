import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AuthContext from '../auth/AuthContext';

const mockStore = configureStore([]);

/**
 * Custom render function that wraps components with necessary providers
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @param {Object} options.store - Redux store (if needed)
 * @param {Object} options.authValue - AuthContext value
 * @returns {Object} Rendered component and utilities
 */
export function render(ui, {
  store = mockStore({}),
  authValue = {
    user: null,
    token: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    loginWithGoogle: jest.fn(),
    loginWithGithub: jest.fn(),
  },
  ...renderOptions
} = {}) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <AuthContext.Provider value={authValue}>
        {children}
      </AuthContext.Provider>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create mock player object
 */
export function createMockPlayer(overrides = {}) {
  return {
    id: 1,
    className: 'Warrior',
    level: 5,
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 50,
    experience: 0,
    inventory: [],
    equippedItems: {
      weapon: null,
      armor: null,
    },
    stats: {
      strength: 16,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 13,
      charisma: 11,
    },
    ...overrides,
  };
}

/**
 * Create mock dungeon object
 */
export function createMockDungeon(overrides = {}) {
  return {
    id: 1,
    name: 'Test Dungeon',
    currentRoomId: 0,
    rooms: [
      {
        id: 0,
        name: 'Entrance',
        description: 'You enter a dark dungeon',
        exits: { east: 1 },
        enemies: [],
        items: [],
      },
    ],
    difficulty: 'normal',
    ...overrides,
  };
}

/**
 * Create mock save state
 */
export function createMockSave(overrides = {}) {
  return {
    id: 1,
    player: createMockPlayer(),
    dungeon: createMockDungeon(),
    log: ['Game started', 'Entered dungeon'],
    turn: 1,
    lastModified: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create mock auth context value
 */
export function createMockAuthValue(overrides = {}) {
  return {
    user: {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      displayName: 'Test User',
    },
    token: 'mock-jwt-token',
    isAuthenticated: true,
    login: jest.fn().mockResolvedValue({}),
    logout: jest.fn(),
    register: jest.fn().mockResolvedValue({}),
    loginWithGoogle: jest.fn().mockResolvedValue({}),
    loginWithGithub: jest.fn().mockResolvedValue({}),
    ...overrides,
  };
}

/**
 * Create mock Redux store state
 */
export function createMockStoreState(overrides = {}) {
  return {
    player: {
      data: createMockPlayer(),
      loading: false,
      error: null,
    },
    dungeon: {
      data: createMockDungeon(),
      loading: false,
      error: null,
    },
    log: {
      entries: ['Game started'],
    },
    turn: {
      current: 1,
    },
    ...overrides,
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
