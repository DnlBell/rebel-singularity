import Player from '../character/player';

describe('Player Class', () => {
  let player;

  beforeEach(() => {
    player = new Player('Test Player', 'Enforcer');
  });

  describe('Constructor', () => {
    it('should create a player with name and class', () => {
      expect(player.name).toBe('Test Player');
      expect(player.className).toBe('Enforcer');
    });

    it('should initialize level to 1', () => {
      expect(player.level).toBe(1);
    });

    it('should initialize experience to 0', () => {
      expect(player.exp).toBe(0);
    });

    it('should initialize inventory capacity to 5', () => {
      expect(player.capacity).toBe(5);
    });

    it('should initialize empty inventory', () => {
      expect(player.inventory).toEqual([]);
      expect(Array.isArray(player.inventory)).toBe(true);
    });

    it('should inherit from Character', () => {
      expect(player.str).toBe(10);
      expect(player.dex).toBe(10);
      expect(player.con).toBe(10);
      expect(player.maxHp).toBe(10);
      expect(player.currentHp).toBe(10);
    });
  });

  describe('Class Types', () => {
    it('should accept Enforcer class', () => {
      const enforcer = new Player('Enforcer Hero', 'Enforcer');
      expect(enforcer.className).toBe('Enforcer');
    });

    it('should accept Jacker class', () => {
      const jacker = new Player('Jacker Hero', 'Jacker');
      expect(jacker.className).toBe('Jacker');
    });

    it('should accept Initiate class', () => {
      const initiate = new Player('Initiate Hero', 'Initiate');
      expect(initiate.className).toBe('Initiate');
    });

    it('should accept custom class names', () => {
      const custom = new Player('Custom', 'CustomClass');
      expect(custom.className).toBe('CustomClass');
    });
  });

  describe('Leveling System', () => {
    it('should allow level changes', () => {
      player.level = 5;
      expect(player.level).toBe(5);
    });

    it('should allow experience accumulation', () => {
      player.exp = 100;
      expect(player.exp).toBe(100);
    });

    it('should handle reaching higher levels', () => {
      player.level = 20;
      expect(player.level).toBe(20);
    });

    it('should handle large experience values', () => {
      player.exp = 1000000;
      expect(player.exp).toBe(1000000);
    });

    it('should track level and exp together', () => {
      player.level = 5;
      player.exp = 500;
      expect(player.level).toBe(5);
      expect(player.exp).toBe(500);
    });
  });

  describe('Inventory Management', () => {
    it('should start with empty inventory', () => {
      expect(player.inventory.length).toBe(0);
    });

    it('should allow adding items to inventory', () => {
      const item = { name: 'Sword', value: 50 };
      player.inventory.push(item);
      expect(player.inventory).toContain(item);
      expect(player.inventory.length).toBe(1);
    });

    it('should allow multiple items in inventory', () => {
      const item1 = { name: 'Sword', value: 50 };
      const item2 = { name: 'Shield', value: 40 };
      const item3 = { name: 'Potion', value: 10 };

      player.inventory.push(item1, item2, item3);

      expect(player.inventory.length).toBe(3);
      expect(player.inventory).toContain(item1);
      expect(player.inventory).toContain(item2);
      expect(player.inventory).toContain(item3);
    });

    it('should allow removing items from inventory', () => {
      const item1 = { name: 'Sword' };
      const item2 = { name: 'Shield' };

      player.inventory.push(item1, item2);
      player.inventory = player.inventory.filter(item => item.name !== 'Sword');

      expect(player.inventory.length).toBe(1);
      expect(player.inventory).toContain(item2);
      expect(player.inventory).not.toContain(item1);
    });

    it('should allow clearing inventory', () => {
      player.inventory.push({ name: 'Sword' }, { name: 'Shield' });
      player.inventory = [];

      expect(player.inventory.length).toBe(0);
      expect(player.inventory).toEqual([]);
    });

    it('should handle inventory at capacity', () => {
      for (let i = 0; i < player.capacity; i++) {
        player.inventory.push({ name: `Item${i}`, value: i });
      }

      expect(player.inventory.length).toBe(5); // capacity is 5
    });

    it('should allow exceeding stated capacity programmatically', () => {
      for (let i = 0; i < 10; i++) {
        player.inventory.push({ name: `Item${i}`, value: i });
      }

      expect(player.inventory.length).toBe(10); // Can exceed capacity at model level
    });
  });

  describe('Inventory Capacity', () => {
    it('should have default capacity of 5', () => {
      const newPlayer = new Player('New', 'Enforcer');
      expect(newPlayer.capacity).toBe(5);
    });

    it('should allow capacity modification', () => {
      player.capacity = 10;
      expect(player.capacity).toBe(10);
    });

    it('should allow reducing capacity', () => {
      player.capacity = 3;
      expect(player.capacity).toBe(3);
    });

    it('should allow very large capacity', () => {
      player.capacity = 999;
      expect(player.capacity).toBe(999);
    });
  });

  describe('Character Attributes Inheritance', () => {
    it('should inherit and allow modification of ability scores', () => {
      player.str = 15;
      player.dex = 12;

      expect(player.str).toBe(15);
      expect(player.dex).toBe(12);
    });

    it('should inherit and manage health', () => {
      player.currentHp = 8;
      expect(player.currentHp).toBe(8);
      expect(player.maxHp).toBe(10);
    });

    it('should inherit and manage mana', () => {
      player.currentMp = 2;
      expect(player.currentMp).toBe(2);
      expect(player.maxMp).toBe(5);
    });

    it('should inherit skill tracking', () => {
      player.perception = 3;
      player.stealth = 2;

      expect(player.perception).toBe(3);
      expect(player.stealth).toBe(2);
    });

    it('should inherit equipment slots', () => {
      const sword = { name: 'Longsword', damage: '1d8' };
      player.weapon = sword;

      expect(player.weapon).toEqual(sword);
    });
  });

  describe('Multiple Players', () => {
    it('should create independent player instances', () => {
      const player1 = new Player('Hero 1', 'Enforcer');
      const player2 = new Player('Hero 2', 'Jacker');

      player1.level = 10;
      player2.level = 5;

      expect(player1.level).toBe(10);
      expect(player2.level).toBe(5);
    });

    it('should not share inventory between players', () => {
      const player1 = new Player('Hero 1', 'Enforcer');
      const player2 = new Player('Hero 2', 'Jacker');

      player1.inventory.push({ name: 'Sword1' });
      player2.inventory.push({ name: 'Sword2' });

      expect(player1.inventory.length).toBe(1);
      expect(player2.inventory.length).toBe(1);
      expect(player1.inventory[0].name).toBe('Sword1');
      expect(player2.inventory[0].name).toBe('Sword2');
    });

    it('should not share class type', () => {
      const player1 = new Player('Hero 1', 'Enforcer');
      const player2 = new Player('Hero 2', 'Jacker');

      expect(player1.className).toBe('Enforcer');
      expect(player2.className).toBe('Jacker');
    });
  });

  describe('Game State Scenarios', () => {
    it('should handle level up with inventory', () => {
      player.inventory.push({ name: 'Sword', value: 100 });
      player.level = 2;
      player.exp = 150;

      expect(player.level).toBe(2);
      expect(player.exp).toBe(150);
      expect(player.inventory.length).toBe(1);
    });

    it('should handle equipment changes during gameplay', () => {
      const sword1 = { name: 'Iron Sword', damage: '1d6' };
      const sword2 = { name: 'Steel Sword', damage: '1d8' };

      player.weapon = sword1;
      expect(player.weapon.name).toBe('Iron Sword');

      player.weapon = sword2;
      expect(player.weapon.name).toBe('Steel Sword');
    });

    it('should maintain complex game state', () => {
      player.level = 5;
      player.exp = 1000;
      player.currentHp = 8;
      player.str = 15;
      player.inventory.push({ name: 'Potion', value: 20 });
      player.weapon = { name: 'Sword', damage: '1d8' };

      expect(player.level).toBe(5);
      expect(player.exp).toBe(1000);
      expect(player.currentHp).toBe(8);
      expect(player.str).toBe(15);
      expect(player.inventory.length).toBe(1);
      expect(player.weapon.name).toBe('Sword');
    });
  });

  describe('Serialization Compatibility', () => {
    it('should be convertible to JSON-like object', () => {
      player.level = 5;
      player.exp = 500;
      player.inventory.push({ name: 'Item1' });

      const playerData = {
        name: player.name,
        className: player.className,
        level: player.level,
        exp: player.exp,
        inventory: player.inventory,
        str: player.str,
        currentHp: player.currentHp,
      };

      expect(playerData.name).toBe('Test Player');
      expect(playerData.className).toBe('Enforcer');
      expect(playerData.level).toBe(5);
      expect(playerData.inventory.length).toBe(1);
    });
  });
});
