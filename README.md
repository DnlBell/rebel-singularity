# Rebel Singularity

A turn-based dungeon crawler RPG built with React and Redux. Navigate procedurally-generated dungeons, battle NPCs, manage inventory, and progress through character advancement in a post-apocalyptic sci-fi setting.

![React](https://img.shields.io/badge/React-16.8.6-blue) ![Redux](https://img.shields.io/badge/Redux-4.0.1-764ABC) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎮 Features

- **Character Creation**: Choose from three unique classes (Enforcer, Jacker, Initiate) with different stat bonuses
- **Turn-Based Combat**: Strategic battles with NPCs using dice-roll mechanics
- **Inventory System**: Collect weapons, armor, and consumables with weight/capacity limits
- **Dungeon Exploration**: Navigate room-based maps with doors, locked containers, and hidden enemies
- **Character Progression**: Gain experience, level up, and improve stats
- **Game State Persistence**: Full Redux state management with DevTools support for time-travel debugging
- **Responsive UI**: Tabbed interface for Play, Inventory, and Character Sheet

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 16.8.6 (Class Components) |
| **State Management** | Redux 4.0.1 + react-redux 7.0.3 |
| **Routing** | React Router DOM 5.0.0 |
| **Styling** | styled-components, Material-UI, Reactstrap |
| **Build Tool** | Create React App (react-scripts 2.1.8) |
| **Node Version** | 10.x+ |

---

## 📦 Installation

### Prerequisites
- Node.js (v10.0.0+)
- npm (v6.0.0+)

### Setup

```bash
# Clone or navigate to project
cd rebel-singularity

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at **http://localhost:3000** with hot-reload enabled.

---

## 🚀 Getting Started

### First Run
1. **Start the game** → See intro text on the Start page
2. **Create a character** → Choose a class and customize your hero
3. **Enter the dungeon** → Navigate rooms, defeat enemies, collect loot
4. **Manage inventory** → Equip weapons/armor, use consumables
5. **Progress** → Gain XP and level up

### Character Classes

| Class | Strengths | Stat Modifiers |
|-------|-----------|-----------------|
| **Enforcer** | Tank, high HP | +2 STR, +2 CON, +1 DEX |
| **Jacker** | Rogue, high evasion | +2 DEX, +1 INT, +1 CON, +1 CHA |
| **Initiate** | Mage, high intellect | +2 INT, +2 WIS, +1 CHA |

### Game Loop
1. Explore rooms by moving through doors
2. Encounter NPCs (enemies or allies)
3. Engage in combat using dice-roll mechanics
4. Loot defeated enemies or containers
5. Manage inventory (equip, use, drop items)
6. Level up as you gain experience
7. Continue deeper into the dungeon

---

## 📁 Project Structure

This is a modular Redux application. See **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** for detailed documentation.

**Quick Overview:**
```
src/
├── actions/        Redux action creators
├── models/         Game domain classes (Character, Dungeon, Item, etc.)
├── reducers/       Redux state reducers
├── resouce/        Game data templates and text
├── view/           Top-level page components
└── widgets/        Reusable UI components
```

---

## 🏗️ Architecture

### Redux Store Structure
```javascript
{
  player: Player | 'empty',    // Player character or empty before creation
  dungeon: Dungeon,            // Current dungeon map and state
  log: [String, ...],          // Game event messages
  turn: Number                 // Current turn counter
}
```

### Data Flow
```
User Interaction → Action Creator → Reducer → Store Update → Component Re-render
```

**Example**: Attacking an NPC
1. Player clicks "Attack" button in Play widget
2. Combat calculation dispatches `updatePlayer()` action
3. `playerReducer` updates player state (health, XP, inventory)
4. Connected components receive new props and re-render
5. Game log displays attack result

### Redux DevTools
Redux DevTools are enabled for debugging:
1. Open browser DevTools (F12)
2. Go to **Redux** tab
3. Inspect every state change and revert to previous states

---

## 📖 Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot-reload.
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.

### Production Build
```bash
npm run build
```
Builds the app for production to the `build/` folder.
Correctly bundles React in production mode and optimizes for best performance.

### Eject (Not Reversible)
```bash
npm run eject
```
Ejects Create React App configuration. **Warning**: this is a one-way operation.

---

## 🎯 Game Entities

### Character Classes
- **Character** (base): HP, armor class, stats, equipment
- **Player** (extends Character): Level, experience, inventory, capacity
- **NPC** (extends Character): Enemy or ally for combat

### Items
- **Weapon**: Deals damage in combat
- **Armor**: Reduces incoming damage (AC)
- **Consumable**: Potions, food, single-use effects
- **Container**: Chests and crates holding loot

### Dungeon Elements
- **Room**: A tile on the dungeon map with NPCs and items
- **Door**: Passage between rooms (may be locked)
- **Dungeon**: 2D array of rooms forming the game world

---

## 💾 State Management Details

### Actions & Reducers

| Action | Effect | Reducer |
|--------|--------|---------|
| `updatePlayer(newPlayer)` | Updates player stats, inventory, level | playerReducer |
| `updateDungeon(newDungeon)` | Updates map, current position, combat state | dungeonReducer |
| `incrementTurn()` | Advances turn counter for game progression | turnReducer |
| (log actions) | Adds message to game event log | logReducer |

### Initial Game State (from `App.js`)
```javascript
{
  player: 'empty',              // Player created during character setup
  dungeon: testDungeon(),       // Test dungeon instance
  log: [gameStartText],         // Opening narrative
  turn: 0                       // Game starts at turn 0
}
```

---

## 🔍 Code Patterns

### Redux Action Creator
```javascript
export const ACTION_NAME = 'namespace:actionName';

export function actionCreator(payload) {
  return { type: ACTION_NAME, payload };
}
```

### Redux Reducer
```javascript
import { ACTION_NAME } from '../actions/action-file.js';

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case ACTION_NAME:
      return payload;           // Return new state
    default:
      return state;             // Return unchanged state
  }
}
```

### Connected Component
```javascript
import { connect } from 'react-redux';

class MyComponent extends Component {
  render() {
    const { player, dungeon } = this.props;
    return <div>{player.name}</div>;
  }
}

export default connect(
  state => ({ player: state.player, dungeon: state.dungeon })
)(MyComponent);
```

---

## 🐛 Known Issues & Notes

- **Typo**: Folder named `resouce` instead of `resource` (be aware when searching/importing)
- **Legacy Code**: Uses class-based components instead of modern React hooks
- **Limited JSDoc**: Most functions lack detailed comments (contribution opportunity)
- **Mixed Styling**: Uses styled-components, Material-UI, Reactstrap, and CSS together
- **No TypeScript**: Pure JavaScript without type checking

---

## 📝 Development Guidelines

### Adding a New Feature

1. **Create a Model** (if needed) in `src/models/`
   ```javascript
   export default class MyEntity {
     constructor(param) { this.param = param; }
   }
   ```

2. **Create Actions** in `src/actions/`
   ```javascript
   export const UPDATE_ENTITY = 'entity:update';
   export function updateEntity(data) { return { type: UPDATE_ENTITY, payload: data }; }
   ```

3. **Create Reducer** in `src/reducers/`
   ```javascript
   export default function reducer(state = {}, { type, payload }) {
     switch(type) { case UPDATE_ENTITY: return payload; default: return state; }
   }
   ```

4. **Add to Store** in `App.js` - merge reducer into `combineReducers()`

5. **Create Widget** in `src/widgets/` - connect to Redux and dispatch actions

6. **Add Route** in `GameView.js` - integrate into tabbed interface

---

## 🎓 Learning Resources

- **Redux**: [Redux Official Docs](https://redux.js.org/)
- **React**: [React Class Components Guide](https://reactjs.org/docs/components-and-props.html)
- **React Router**: [React Router v5 Docs](https://v5.reactrouter.com/)
- **styled-components**: [styled-components Docs](https://styled-components.com/)

---

## 🤝 Contributing

When contributing to Rebel Singularity:

1. Follow the existing file structure and naming conventions
2. Use Redux for any state that multiple components need
3. Keep components focused (one responsibility each)
4. Add comments for complex game logic
5. Test changes with Redux DevTools
6. Reference `PROJECT_STRUCTURE.md` for architecture questions

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## 🗺️ Project Documentation

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed folder/file documentation and data flow diagrams
- **App.js** - Redux store configuration and routing setup
- **src/models/** - Game entity class definitions
- **src/resouce/Text.js** - Game narrative and descriptions

---

## 💡 Future Enhancement Ideas

- [ ] Procedural dungeon generation
- [ ] More combat mechanics (special abilities, spells)
- [ ] NPC dialogue system
- [ ] Equipment crafting
- [ ] Quest system
- [ ] Multiplayer support
- [ ] Save/load game progress
- [ ] More character classes and skills
- [ ] Visual graphics (sprite/canvas rendering)
- [ ] Sound effects and music

---

**Created**: School Project  
**Last Updated**: May 2026  
**Status**: Active Development

Happy dungeon crawling! 🐉⚔️
