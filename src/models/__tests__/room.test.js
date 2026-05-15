import Room from '../room/room';

describe('Room Class', () => {
  let room;

  beforeEach(() => {
    room = new Room();
  });

  describe('Constructor', () => {
    it('should create room with default properties', () => {
      expect(room.doors).toEqual([]);
      expect(room.characters).toEqual([]);
      expect(room.containers).toEqual([]);
      expect(room.generalDescription).toBe('...');
    });

    it('should have all properties defined', () => {
      expect(room).toHaveProperty('doors');
      expect(room).toHaveProperty('characters');
      expect(room).toHaveProperty('containers');
      expect(room).toHaveProperty('generalDescription');
    });

    it('should have doors as array', () => {
      expect(Array.isArray(room.doors)).toBe(true);
    });

    it('should have characters as array', () => {
      expect(Array.isArray(room.characters)).toBe(true);
    });

    it('should have containers as array', () => {
      expect(Array.isArray(room.containers)).toBe(true);
    });

    it('should have generalDescription as string', () => {
      expect(typeof room.generalDescription).toBe('string');
    });
  });

  describe('Room Description', () => {
    it('should allow modifying description', () => {
      room.generalDescription = 'A damp stone chamber with faint torch light';
      expect(room.generalDescription).toBe('A damp stone chamber with faint torch light');
    });

    it('should handle different room types', () => {
      const entranceRoom = new Room();
      entranceRoom.generalDescription = 'The start of your journey';

      const bossRoom = new Room();
      bossRoom.generalDescription = 'Where the final battle awaits';

      expect(entranceRoom.generalDescription).toContain('start');
      expect(bossRoom.generalDescription).toContain('final battle');
    });

    it('should handle multi-line descriptions', () => {
      room.generalDescription = 'A vast chamber.\nColumns reach to the ceiling.\nAn eerie silence fills the air.';
      expect(room.generalDescription).toContain('vast chamber');
      expect(room.generalDescription).toContain('eerie silence');
    });

    it('should handle very long descriptions', () => {
      const longDesc = 'A'.repeat(1000);
      room.generalDescription = longDesc;
      expect(room.generalDescription.length).toBe(1000);
    });
  });

  describe('Doors Management', () => {
    it('should start with empty doors array', () => {
      expect(room.doors.length).toBe(0);
    });

    it('should allow adding doors', () => {
      room.doors.push({ direction: 'north', exit: 1 });
      room.doors.push({ direction: 'south', exit: 2 });

      expect(room.doors.length).toBe(2);
      expect(room.doors[0].direction).toBe('north');
    });

    it('should support four-directional navigation', () => {
      room.doors = [
        { direction: 'north', exit: 1 },
        { direction: 'south', exit: 2 },
        { direction: 'east', exit: 3 },
        { direction: 'west', exit: 4 },
      ];

      expect(room.doors.length).toBe(4);
      const directions = room.doors.map(d => d.direction);
      expect(directions).toContain('north');
      expect(directions).toContain('south');
      expect(directions).toContain('east');
      expect(directions).toContain('west');
    });

    it('should support removing doors', () => {
      room.doors = [
        { direction: 'north', exit: 1 },
        { direction: 'south', exit: 2 },
      ];

      room.doors.splice(0, 1);

      expect(room.doors.length).toBe(1);
      expect(room.doors[0].direction).toBe('south');
    });

    it('should handle complex door data', () => {
      room.doors = [
        {
          direction: 'north',
          exit: 5,
          locked: true,
          requiresKey: 'gold_key',
        },
      ];

      expect(room.doors[0].locked).toBe(true);
      expect(room.doors[0].requiresKey).toBe('gold_key');
    });
  });

  describe('Characters Management', () => {
    it('should start with empty characters array', () => {
      expect(room.characters.length).toBe(0);
    });

    it('should allow adding enemies', () => {
      room.characters.push({ name: 'Goblin', hp: 10 });
      room.characters.push({ name: 'Orc', hp: 25 });

      expect(room.characters.length).toBe(2);
      expect(room.characters[0].name).toBe('Goblin');
    });

    it('should allow adding NPCs', () => {
      room.characters.push({ name: 'Merchant', dialogue: 'Welcome!' });

      expect(room.characters.length).toBe(1);
      expect(room.characters[0].dialogue).toBe('Welcome!');
    });

    it('should support mixed characters and NPCs', () => {
      room.characters = [
        { name: 'Goblin', hp: 10, isEnemy: true },
        { name: 'Merchant', role: 'trader', isEnemy: false },
        { name: 'Orc', hp: 25, isEnemy: true },
      ];

      expect(room.characters.length).toBe(3);
      const enemies = room.characters.filter(c => c.isEnemy);
      expect(enemies.length).toBe(2);
    });

    it('should allow removing characters', () => {
      room.characters = [
        { name: 'Goblin' },
        { name: 'Orc' },
      ];

      room.characters.splice(0, 1);

      expect(room.characters.length).toBe(1);
      expect(room.characters[0].name).toBe('Orc');
    });

    it('should handle clearing all characters', () => {
      room.characters = [
        { name: 'Enemy 1' },
        { name: 'Enemy 2' },
      ];

      room.characters = [];

      expect(room.characters.length).toBe(0);
    });
  });

  describe('Containers Management', () => {
    it('should start with empty containers array', () => {
      expect(room.containers.length).toBe(0);
    });

    it('should allow adding containers', () => {
      room.containers.push({ name: 'Chest', items: [] });
      room.containers.push({ name: 'Crate', items: [] });

      expect(room.containers.length).toBe(2);
      expect(room.containers[0].name).toBe('Chest');
    });

    it('should support containers with items', () => {
      room.containers = [
        {
          name: 'Gold Chest',
          items: [
            { name: 'Gold Coin', value: 1 },
            { name: 'Gold Coin', value: 1 },
          ],
        },
        {
          name: 'Magic Chest',
          items: [{ name: 'Potion', value: 50 }],
        },
      ];

      expect(room.containers.length).toBe(2);
      expect(room.containers[0].items.length).toBe(2);
      expect(room.containers[1].items[0].name).toBe('Potion');
    });

    it('should allow looting containers', () => {
      room.containers = [
        {
          name: 'Treasure Chest',
          items: [{ name: 'Ruby', value: 500 }],
          opened: false,
        },
      ];

      expect(room.containers[0].opened).toBe(false);

      room.containers[0].opened = true;
      expect(room.containers[0].opened).toBe(true);
    });

    it('should support removing containers', () => {
      room.containers = [
        { name: 'Container 1' },
        { name: 'Container 2' },
      ];

      room.containers.splice(0, 1);

      expect(room.containers.length).toBe(1);
      expect(room.containers[0].name).toBe('Container 2');
    });
  });

  describe('Room Types', () => {
    it('should support encounter room (with enemies)', () => {
      room.generalDescription = 'A goblin lair';
      room.characters = [
        { name: 'Goblin', hp: 10 },
        { name: 'Goblin', hp: 10 },
      ];

      expect(room.characters.length).toBe(2);
    });

    it('should support treasure room', () => {
      room.generalDescription = 'A chamber filled with riches';
      room.containers = [
        { name: 'Gold Pile', items: [{ name: 'Gold', value: 1000 }] },
      ];

      expect(room.containers.length).toBe(1);
    });

    it('should support safe room (with NPCs)', () => {
      room.generalDescription = 'A tavern';
      room.characters = [
        { name: 'Innkeeper', dialogue: 'Welcome' },
        { name: 'Guard', dialogue: 'Stay sharp' },
      ];

      expect(room.characters.length).toBe(2);
    });

    it('should support boss room (fully populated)', () => {
      room.generalDescription = 'Dragon lair';
      room.characters = [{ name: 'Ancient Dragon', hp: 500 }];
      room.containers = [{ name: 'Dragon Hoard', items: [{ name: 'Crown' }] }];
      room.doors = [{ direction: 'exit', exit: 0 }];

      expect(room.characters.length).toBe(1);
      expect(room.containers.length).toBe(1);
      expect(room.doors.length).toBe(1);
    });
  });

  describe('Multiple Rooms', () => {
    it('should create independent room instances', () => {
      const room1 = new Room();
      const room2 = new Room();

      room1.generalDescription = 'Room 1';
      room2.generalDescription = 'Room 2';

      expect(room1.generalDescription).toBe('Room 1');
      expect(room2.generalDescription).toBe('Room 2');
    });

    it('should not share arrays between instances', () => {
      const room1 = new Room();
      const room2 = new Room();

      room1.doors.push({ direction: 'north', exit: 1 });

      expect(room1.doors.length).toBe(1);
      expect(room2.doors.length).toBe(0);
    });

    it('should support dungeon with multiple rooms', () => {
      const rooms = [new Room(), new Room(), new Room(), new Room()];

      rooms[0].generalDescription = 'Entrance';
      rooms[1].generalDescription = 'Corridor';
      rooms[2].generalDescription = 'Chamber';
      rooms[3].generalDescription = 'Boss Room';

      expect(rooms.length).toBe(4);
      expect(rooms[3].generalDescription).toBe('Boss Room');
    });

    it('should track different enemies per room', () => {
      const easyRoom = new Room();
      easyRoom.characters = [{ name: 'Rat', hp: 5 }];

      const hardRoom = new Room();
      hardRoom.characters = [{ name: 'Dragon', hp: 500 }];

      expect(easyRoom.characters[0].hp).toBe(5);
      expect(hardRoom.characters[0].hp).toBe(500);
    });
  });

  describe('Room State Changes', () => {
    it('should track room clearing (removing enemies during combat)', () => {
      room.characters = [
        { name: 'Enemy 1' },
        { name: 'Enemy 2' },
      ];

      expect(room.characters.length).toBe(2);

      // Combat resolved, enemies defeated
      room.characters = [];

      expect(room.characters.length).toBe(0);
    });

    it('should track item pickup (modifying containers)', () => {
      room.containers = [
        { name: 'Chest', items: [{ name: 'Gold' }, { name: 'Potion' }] },
      ];

      // Player loots chest
      room.containers[0].items = [];

      expect(room.containers[0].items.length).toBe(0);
    });

    it('should support dynamic room population', () => {
      // Initially empty
      expect(room.characters.length).toBe(0);

      // Enemies spawn
      room.characters = [{ name: 'Goblin' }];
      expect(room.characters.length).toBe(1);

      // Combat resolved
      room.characters = [];
      expect(room.characters.length).toBe(0);
    });
  });

  describe('Complex Room Scenarios', () => {
    it('should handle fully populated room', () => {
      room.generalDescription = 'A dangerous treasure chamber';
      room.characters = [
        { name: 'Goblin', hp: 10 },
        { name: 'Goblin', hp: 10 },
      ];
      room.containers = [
        { name: 'Treasure Chest', items: [{ name: 'Gold' }] },
      ];
      room.doors = [
        { direction: 'north', exit: 1 },
        { direction: 'south', exit: 2 },
      ];

      expect(room.characters.length).toBe(2);
      expect(room.containers.length).toBe(1);
      expect(room.doors.length).toBe(2);
    });

    it('should handle empty room', () => {
      room.generalDescription = 'An empty chamber';
      room.characters = [];
      room.containers = [];
      room.doors = [];

      expect(room.characters.length).toBe(0);
      expect(room.containers.length).toBe(0);
      expect(room.doors.length).toBe(0);
    });

    it('should evolve room state during gameplay', () => {
      // Room starts populated
      room.characters = [{ name: 'Goblin', hp: 10 }];
      room.containers = [{ name: 'Chest', items: [{ name: 'Gold' }] }];

      expect(room.characters.length).toBe(1);
      expect(room.containers[0].items.length).toBe(1);

      // Combat resolves
      room.characters = [];

      // Loot collected
      room.containers[0].items = [];

      expect(room.characters.length).toBe(0);
      expect(room.containers[0].items.length).toBe(0);
    });
  });

  describe('Serialization', () => {
    it('should convert to JSON', () => {
      room.generalDescription = 'Test Room';
      room.characters = [{ name: 'Goblin' }];
      room.doors = [{ direction: 'north', exit: 1 }];

      const json = JSON.stringify(room);

      expect(json).toContain('Test Room');
      expect(json).toContain('Goblin');
      expect(json).toContain('north');
    });

    it('should restore from JSON', () => {
      room.generalDescription = 'Chamber';
      room.characters = [{ name: 'Guard' }];
      room.containers = [{ name: 'Chest' }];

      const json = JSON.stringify(room);
      const restored = JSON.parse(json);

      expect(restored.generalDescription).toBe('Chamber');
      expect(restored.characters[0].name).toBe('Guard');
      expect(restored.containers[0].name).toBe('Chest');
    });
  });

  describe('Edge Cases', () => {
    it('should handle many doors', () => {
      for (let i = 0; i < 10; i++) {
        room.doors.push({ direction: `door_${i}`, exit: i });
      }

      expect(room.doors.length).toBe(10);
      expect(room.doors[9].direction).toBe('door_9');
    });

    it('should handle many characters', () => {
      for (let i = 0; i < 50; i++) {
        room.characters.push({ name: `Enemy ${i}`, hp: 10 });
      }

      expect(room.characters.length).toBe(50);
    });

    it('should handle many containers', () => {
      for (let i = 0; i < 20; i++) {
        room.containers.push({ name: `Container ${i}`, items: [] });
      }

      expect(room.containers.length).toBe(20);
    });

    it('should handle unicode in description', () => {
      room.generalDescription = '⚔️ Battlefield 🐉 with 魔法';
      expect(room.generalDescription).toContain('⚔️');
    });

    it('should allow empty description', () => {
      room.generalDescription = '';
      expect(room.generalDescription).toBe('');
    });

    it('should persist default description until modified', () => {
      const newRoom = new Room();
      expect(newRoom.generalDescription).toBe('...');

      newRoom.generalDescription = 'Modified';
      expect(newRoom.generalDescription).toBe('Modified');
    });
  });

  describe('Room Collections', () => {
    it('should find empty rooms', () => {
      const rooms = [
        new Room(),
        new Room(),
        new Room(),
      ];

      rooms[0].characters = [{ name: 'Enemy' }];
      rooms[2].characters = [{ name: 'Enemy' }];

      const emptyRooms = rooms.filter(r => r.characters.length === 0);

      expect(emptyRooms.length).toBe(1);
    });

    it('should find rooms with specific content', () => {
      const rooms = [
        new Room(),
        new Room(),
        new Room(),
      ];

      rooms[1].containers = [{ name: 'Treasure' }];

      const treasureRooms = rooms.filter(r => r.containers.length > 0);

      expect(treasureRooms.length).toBe(1);
      expect(treasureRooms[0].containers[0].name).toBe('Treasure');
    });
  });
});

