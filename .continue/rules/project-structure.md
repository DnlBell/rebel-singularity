# Rebel Singularity - Project Structure

## Overview
**Rebel Singularity** is a turn-based dungeon crawler RPG built with React and Redux. Players create characters, navigate procedurally-generated dungeons, engage in combat with NPCs, and manage inventory and equipment.

## Technology Stack
- **Frontend Framework**: React 16.8.6 (class components)
- **State Management**: Redux 4.0.1 with react-redux 7.0.3
- **Routing**: React Router DOM 5.0.0
- **Styling**: styled-components 4.1.3, Material-UI 3.9.3, Reactstrap
- **Build Tool**: Create React App (react-scripts 2.1.8)

---

## Folder Structure

```
src/
├── actions/              # Redux action creators
├── models/               # Game domain models (classes)
│   ├── character/        # Player & NPC character classes
│   ├── dungeon/          # Dungeon map and structure
│   ├── item/             # Equipment and item classes
│   └── room/             # Room, door, and container classes
├── reducers/             # Redux state reducers
├── resouce/              # Game data (templates, text, constants)
├── view/                 # Top-level page components
├── widgets/              # Reusable UI components
├── App.js                # Root component with Redux store setup
├── index.js              # React DOM render entry point
└── index.css             # Root styles
```

---

## Detailed File Descriptions

### `/actions` - Redux Action Creators
Redux action creators that dispatch state changes to the store.

| File | Purpose |
|------|---------|
| `player-actions.js` | `UPDATE_PLAYER` - Updates player state (profile, stats, inventory) |
| `dungeon-actions.js` | `UPDATE_DUNGEON` - Updates dungeon map and exploration state |
| `turn-actions.js` | `INCREMENT_TURN` - Increments turn counter for game progression |
| `log-actions.js` | Actions for game event logging/messaging |

**Pattern**: Each action file exports constants and action creator functions
```javascript
export const ACTION_NAME = 'namespace:actionName';
export function actionCreator(payload) {
  return { type: ACTION_NAME, payload };
}
```

### `/models` - Game Domain Objects

#### `/models/character` - Character Classes
Combat-capable entities in the game.

| File | Class | Purpose |
|------|-------|---------|
| `character.js` | `Character` | Base class with HP, stats, equipment |
| `player.js` | `Player extends Character` | Playable character with level, exp, inventory |
| `npc.js` | `NPC extends Character` | Non-player characters (enemies/allies) |

**Character Stats**: strength, dexterity, constitution, intelligence, wisdom, charisma

#### `/models/item` - Equipment & Items
Collectible equipment and consumables.

| File | Class | Purpose |
|------|-------|---------|
| `item.js` | `Item` | Base class for all items (name, description, value) |
| `weapon.js` | `Weapon extends Item` | Combat weapons with damage stats |
| `armor.js` | `Armor extends Item` | Defensive gear with AC/protection |
| `consumable.js` | `Consumable extends Item` | Potions, food, single-use items |

#### `/models/dungeon` - Dungeon Structure
Game world map and navigation.

| File | Class | Purpose |
|------|-------|---------|
| `dungeon.js` | `Dungeon` | 2D array map, current position, combat state |

#### `/models/room` - Room Components
Individual map tiles and room objects.

| File | Class | Purpose |
|------|-------|---------|
| `room.js` | `Room` | A single dungeon tile with NPCs and loot |
| `door.js` | `Door` | Passageway between rooms (locked/open) |
| `container.js` | `Container` | Chests, crates for storing items |

### `/reducers` - Redux State Management
Pure functions that take current state and actions, return new state.

| File | Manages |
|------|---------|
| `playerReducer.js` | Player object (character, inventory, stats) |
| `dungeonReducer.js` | Dungeon map and exploration state |
| `logReducer.js` | Array of game messages/events |
| `turnReducer.js` | Turn counter (integer) |

**Store Shape**:
```javascript
{
  player: Player | 'empty',      // 'empty' until character created
  dungeon: Dungeon,              // Current dungeon instance
  log: [String, ...],            // Game event messages
  turn: Number                   // Current turn counter
}
```

### `/resouce` - Game Data & Templates

| File | Purpose |
|------|---------|
| `playerTemplates.js` | Player class definitions (Enforcer, Jacker, Initiate) |
| `npcTemplates.js` | Pre-built NPC definitions (enemies, allies) |
| `weaponTemplates.js` | Weapon definitions (sword, bow, etc.) |
| `armorTemplates.js` | Armor definitions (helmet, chest, etc.) |
| `consumableTemplates.js` | Consumable item definitions (potions, food) |
| `itemTemplates.js` | Generic item definitions |
| `containerTemplates.js` | Container/chest definitions |
| `doorTemplates.js` | Door definitions (locked, trapped, etc.) |
| `dungeonTemplate.js` | Dungeon map and room generation |
| `Text.js` | Game narrative text and descriptions |

**Usage Pattern**: Templates are instantiated in views/pages and dispatched to Redux store

### `/view` - Page Components
Top-level route components, connected to Redux store.

| File | Purpose | Route |
|------|---------|-------|
| `Start.js` | Game intro/menu screen | `/` |
| `CreateCharacter.js` | Character creation wizard | `/create` |
| `GameView.js` | Main gameplay interface with tabs | `/game` |

**Responsibilities**:
- Connect to Redux store via `@connect()`
- Render page layout with tab navigation
- Route to child widgets (Play, Inventory, CharacterSheet)

### `/widgets` - Reusable UI Components
Presentational and container components for displaying game data.

| File | Purpose |
|------|---------|
| `Play.js` | Main gameplay area (dungeon display, combat, movement) |
| `Inventory.js` | Player inventory display and item management |
| `ItemList.js` | List of items (reusable component) |
| `ItemMenuList.js` | Item menu with actions (use, equip, drop) |
| `ItemIcon.js` | Visual representation of items |
| `CharacterSheet.js` | Player stats, attributes, character info |
| `Log.js` | Game event log/message history |
| `ActionMenu.js` | Combat/action selection menu |
| `StatBox.js` | Individual stat display component |

---

## Redux Data Flow

```
User Action (Click button, etc.)
    ↓
Widget Component calls action creator
    ↓
Action: { type: 'player:updatePlayer', payload: newPlayer }
    ↓
Reducer processes action, filters by type
    ↓
Returns new state slice
    ↓
combineReducers merges all slices → new store state
    ↓
Store notifies connected components
    ↓
Components re-render with new props
```

### Example: Attacking an NPC
1. User clicks "Attack" in `Play` widget
2. `Play` calls `updatePlayer()` action creator
3. Action dispatched: `{ type: 'player:updatePlayer', payload: damageCalc() }`
4. `playerReducer` processes action → returns updated player object
5. Store updates player state
6. Connected components receive new player stats → re-render

---

## Initial State

Set in `App.js` `createStore()`:

```javascript
{
  player: 'empty',                    // No player until character created
  dungeon: testDungeon(),             // Test dungeon instance
  log: [gameStartText],               // Opening narrative
  turn: 0                             // Game starts at turn 0
}
```

**Game Flow**:
1. Start → `Start.js` (choose to create character)
2. Create Character → `CreateCharacter.js` (select class, stats)
3. Dispatch `updatePlayer()` → player state changes from 'empty' to Player instance
4. Redirect to `/game` → `GameView.js` with Play, Inventory, CharacterSheet
5. Gameplay → Dispatch `updatePlayer()`, `updateDungeon()`, `incrementTurn()` as game progresses

---

## Architecture Patterns

### Redux Store Pattern
- **Centralized state**: All game data in single Redux store
- **Unidirectional data flow**: Actions → Reducers → Store → Components
- **Time-travel debugging**: Redux DevTools enabled in app (check browser console)

### Component Hierarchy
```
App (store provider)
├── Route: Start
├── Route: CreateCharacter
└── Route: GameView (connected)
    ├── Play (connected)
    ├── Inventory (connected)
    └── CharacterSheet (connected)
```

### Class-Based Components
- Uses legacy React class syntax (no hooks)
- State management via Redux (not component state)
- Few uses of local state (e.g., tab selection)

---

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `App.js` | Redux store configuration, route setup, Root component |
| `index.js` | React DOM render, Provider wrapper |
| `index.css` | Global styles |

---

## Key Game Concepts

### Character Classes (from `playerTemplates.js`)
- **Enforcer**: +2 STR, +2 CON, +1 DEX (tank)
- **Jacker**: +2 DEX, +1 CON, +1 INT, +1 CHA (rogue)
- **Initiate**: +2 INT, +2 WIS, +1 CHA (mage)

### Game Loop
1. Increment turn counter
2. Update dungeon state (NPC movement, events)
3. Check for combat interactions
4. Log events to message history
5. Update player state (HP, XP, inventory changes)

### Inventory System
- Player has inventory array with `capacity` limit (default: 5 items)
- Items: Weapons, Armor, Consumables, Quest items
- Equip/unequip changes active stats
- Use consumables (potions) to restore health

---

## Common File Patterns

### Model Class Pattern
```javascript
export default class MyClass {
  constructor(param1, param2) {
    this.param1 = param1;      // Public properties
    this.param2 = param2;
  }
  
  method() {                    // Behavior
    // ...
  }
}
```

### Action Creator Pattern
```javascript
export const ACTION_NAME = 'namespace:actionName';

export function actionCreator(payload) {
  return { type: ACTION_NAME, payload };
}
```

### Reducer Pattern
```javascript
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_NAME:
      return payload;           // Return new state
    default:
      return state;             // Return unchanged state
  }
}
```

### Connected Component Pattern
```javascript
class MyComponent extends Component {
  render() {
    const { playerProp } = this.props;  // From store
    return <div>{playerProp}</div>;
  }
}

export default connect(
  state => ({ playerProp: state.player })
)(MyComponent);
```

---

## Notes for Developers

- **Typo Alert**: Folder is named `resouce` instead of `resource` (check for potential bugs)
- **Redux DevTools**: Enabled in production for debugging, can view state changes in DevTools
- **Routing**: Uses React Router v5, routes defined in `App.js`
- **Styling**: Mixes styled-components, Material-UI, Reactstrap, and CSS
- **No TypeScript**: Pure JavaScript, no type checking
- **Limited Comments**: Few code comments, consider adding more JSDoc

---

## Getting Started

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm start` (opens `http://localhost:3000`)
3. **View Redux state**: Open DevTools → Redux tab
4. **Test**: `npm test` (test runner)
5. **Build**: `npm run build` (production bundle)

