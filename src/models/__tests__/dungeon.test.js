import Dungeon from '../dungeon/dungeon';

describe('Dungeon Class', () => {
  let dungeon;

  beforeEach(() => {
    dungeon = new Dungeon();
  });

  describe('Constructor', () => {
    it('should create dungeon with empty map', () => {
      expect(dungeon.map).toEqual([]);
      expect(Array.isArray(dungeon.map)).toBe(true);
    });

    it('should initialize inCombat to false', () => {
      expect(dungeon.inCombat).toBe(false);
    });

    it('should initialize currentPosition to 0', () => {
      expect(dungeon.currentPosition).toBe(0);
    });

    it('should have all properties defined', () => {
      expect(dungeon).toHaveProperty('map');
      expect(dungeon).toHaveProperty('inCombat');
      expect(dungeon).toHaveProperty('currentPosition');
    });
  });

  describe('Map Management', () => {
    it('should allow adding rooms to map', () => {
      const room0 = { id: 0, name: 'Entrance' };
      const room1 = { id: 1, name: 'Corridor' };

      dungeon.map.push(room0, room1);

      expect(dungeon.map.length).toBe(2);
      expect(dungeon.map[0]).toBe(room0);
      expect(dungeon.map[1]).toBe(room1);
    });

    it('should support array indexing for room access', () => {
      const room = { id: 0, name: 'Test Room' };
      dungeon.map[0] = room;

      expect(dungeon.map[0]).toBe(room);
      expect(dungeon.map[0].name).toBe('Test Room');
    });

    it('should allow building multi-room dungeon', () => {
      const rooms = [
        { id: 0, name: 'Start', exits: { east: 1 } },
        { id: 1, name: 'Main Hall', exits: { west: 0, north: 2 } },
        { id: 2, name: 'Treasury', exits: { south: 1 } },
        { id: 3, name: 'Boss Chamber', exits: { south: 1 } },
      ];

      dungeon.map = rooms;

      expect(dungeon.map.length).toBe(4);
      expect(dungeon.map[0].exits.east).toBe(1);
      expect(dungeon.map[2].exits.south).toBe(1);
    });

    it('should allow clearing and rebuilding map', () => {
      dungeon.map = [{ id: 0 }, { id: 1 }];
      expect(dungeon.map.length).toBe(2);

      dungeon.map = [];
      expect(dungeon.map.length).toBe(0);

      dungeon.map = [{ id: 0 }];
      expect(dungeon.map.length).toBe(1);
    });

    it('should preserve room data when accessing by index', () => {
      const room = {
        id: 5,
        name: 'Special Room',
        description: 'A unique room',
        enemies: [{ name: 'Goblin' }],
        items: [{ name: 'Potion' }],
      };

      dungeon.map[5] = room;

      expect(dungeon.map[5].enemies[0].name).toBe('Goblin');
      expect(dungeon.map[5].items[0].name).toBe('Potion');
    });
  });

  describe('Current Position / Player Location', () => {
    it('should start at position 0', () => {
      expect(dungeon.currentPosition).toBe(0);
    });

    it('should allow moving to different rooms', () => {
      dungeon.currentPosition = 1;
      expect(dungeon.currentPosition).toBe(1);

      dungeon.currentPosition = 5;
      expect(dungeon.currentPosition).toBe(5);
    });

    it('should handle movement through doorways', () => {
      dungeon.map = [
        { id: 0, doors: [{ exit: 1 }] },
        { id: 1, doors: [{ exit: 0 }, { exit: 2 }] },
        { id: 2, doors: [{ exit: 1 }] },
      ];

      dungeon.currentPosition = 0;
      dungeon.currentPosition = dungeon.map[0].doors[0].exit;
      expect(dungeon.currentPosition).toBe(1);

      dungeon.currentPosition = dungeon.map[1].doors[1].exit;
      expect(dungeon.currentPosition).toBe(2);
    });

    it('should allow any integer position', () => {
      dungeon.currentPosition = 999;
      expect(dungeon.currentPosition).toBe(999);
    });

    it('should allow position 0', () => {
      dungeon.currentPosition = 5;
      dungeon.currentPosition = 0;
      expect(dungeon.currentPosition).toBe(0);
    });

    it('should track position changes across multiple moves', () => {
      const positions = [0, 1, 2, 1, 0, 3];

      positions.forEach((pos, index) => {
        dungeon.currentPosition = pos;
        expect(dungeon.currentPosition).toBe(pos);
      });
    });
  });

  describe('Combat State', () => {
    it('should start not in combat', () => {
      expect(dungeon.inCombat).toBe(false);
    });

    it('should allow entering combat', () => {
      dungeon.inCombat = true;
      expect(dungeon.inCombat).toBe(true);
    });

    it('should allow exiting combat', () => {
      dungeon.inCombat = true;
      dungeon.inCombat = false;
      expect(dungeon.inCombat).toBe(false);
    });

    it('should track combat state independently from position', () => {
      dungeon.currentPosition = 3;
      dungeon.inCombat = true;

      expect(dungeon.currentPosition).toBe(3);
      expect(dungeon.inCombat).toBe(true);

      dungeon.inCombat = false;
      expect(dungeon.currentPosition).toBe(3);
      expect(dungeon.inCombat).toBe(false);
    });

    it('should allow multiple combat transitions', () => {
      dungeon.inCombat = true;
      dungeon.inCombat = false;
      dungeon.inCombat = true;
      dungeon.inCombat = false;

      expect(dungeon.inCombat).toBe(false);
    });
  });

  describe('Complex Dungeon Scenarios', () => {
    beforeEach(() => {
      // Setup a realistic dungeon with multiple rooms
      dungeon.map = [
        { id: 0, name: 'Entrance', enemies: [] },
        { id: 1, name: 'Main Hall', enemies: [{ name: 'Orc' }] },
        { id: 2, name: 'Side Chamber', enemies: [] },
        { id: 3, name: 'Boss Room', enemies: [{ name: 'Dragon' }] },
      ];
    });

    it('should handle player exploration', () => {
      // Enter dungeon
      expect(dungeon.currentPosition).toBe(0);

      // Move to main hall
      dungeon.currentPosition = 1;
      expect(dungeon.inCombat).toBe(false);

      // Start combat with enemy
      dungeon.inCombat = true;
      expect(dungeon.map[dungeon.currentPosition].enemies.length).toBe(1);

      // End combat and move to next room
      dungeon.inCombat = false;
      dungeon.currentPosition = 2;
      expect(dungeon.currentPosition).toBe(2);
      expect(dungeon.inCombat).toBe(false);
    });

    it('should track state during boss encounter', () => {
      // Navigate to boss
      dungeon.currentPosition = 3;
      dungeon.inCombat = true;

      // Boss fight ongoing
      expect(dungeon.map[3].enemies[0].name).toBe('Dragon');
      expect(dungeon.inCombat).toBe(true);

      // Defeat boss and exit
      dungeon.inCombat = false;

      expect(dungeon.currentPosition).toBe(3);
      expect(dungeon.inCombat).toBe(false);
    });

    it('should maintain dungeon state across multiple visits', () => {
      // First visit to room 1
      dungeon.currentPosition = 1;
      dungeon.inCombat = true;
      dungeon.inCombat = false;

      // Move away and return
      dungeon.currentPosition = 2;
      const roomData = dungeon.map[1];

      dungeon.currentPosition = 1;

      // Room data should be consistent
      expect(dungeon.map[1]).toBe(roomData);
      expect(dungeon.map[1].enemies[0].name).toBe('Orc');
    });
  });

  describe('Multiple Dungeons', () => {
    it('should create independent dungeon instances', () => {
      const dungeon1 = new Dungeon();
      const dungeon2 = new Dungeon();

      dungeon1.map = [{ id: 0, name: 'Dungeon 1' }];
      dungeon2.map = [{ id: 0, name: 'Dungeon 2' }];

      expect(dungeon1.map[0].name).toBe('Dungeon 1');
      expect(dungeon2.map[0].name).toBe('Dungeon 2');
    });

    it('should not share state between instances', () => {
      const dungeon1 = new Dungeon();
      const dungeon2 = new Dungeon();

      dungeon1.currentPosition = 5;
      dungeon1.inCombat = true;

      expect(dungeon2.currentPosition).toBe(0);
      expect(dungeon2.inCombat).toBe(false);
    });
  });

  describe('Large Dungeons', () => {
    it('should handle many rooms', () => {
      const rooms = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Room ${i}`,
      }));

      dungeon.map = rooms;

      expect(dungeon.map.length).toBe(100);
      expect(dungeon.map[50].id).toBe(50);
      expect(dungeon.map[99].name).toBe('Room 99');
    });

    it('should support navigation through large dungeon', () => {
      dungeon.map = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        name: `Room ${i}`,
      }));

      // Travel through dungeon
      for (let i = 0; i < 50; i++) {
        dungeon.currentPosition = i;
        expect(dungeon.currentPosition).toBe(i);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle being at invalid position (beyond map)', () => {
      dungeon.map = [{ id: 0 }, { id: 1 }];
      dungeon.currentPosition = 10; // Beyond map bounds

      // Model allows this; validation would be at application level
      expect(dungeon.currentPosition).toBe(10);
    });

    it('should handle negative position', () => {
      dungeon.currentPosition = -1;
      expect(dungeon.currentPosition).toBe(-1);
    });

    it('should handle rapid state changes', () => {
      dungeon.currentPosition = 1;
      dungeon.inCombat = true;
      dungeon.currentPosition = 2;
      dungeon.inCombat = false;
      dungeon.currentPosition = 0;

      expect(dungeon.currentPosition).toBe(0);
      expect(dungeon.inCombat).toBe(false);
    });

    it('should handle null room data', () => {
      dungeon.map[0] = null;
      expect(dungeon.map[0]).toBe(null);
    });
  });

  describe('Room Content Management', () => {
    it('should allow storing complex room data', () => {
      const complexRoom = {
        id: 0,
        name: 'Treasure Room',
        description: 'A room filled with riches',
        exits: { north: 1, south: 2 },
        enemies: [
          { name: 'Goblin', hp: 10 },
          { name: 'Orc', hp: 25 },
        ],
        items: [
          { name: 'Gold Chest', value: 1000 },
          { name: 'Magic Amulet', value: 500 },
        ],
        npc: { name: 'Merchant', dialogue: 'Welcome traveler' },
      };

      dungeon.map.push(complexRoom);

      expect(dungeon.map[0].enemies.length).toBe(2);
      expect(dungeon.map[0].items[0].value).toBe(1000);
      expect(dungeon.map[0].npc.dialogue).toBe('Welcome traveler');
    });
  });
});
