import Item from '../item/item';

describe('Item Class', () => {
  let item;

  beforeEach(() => {
    item = new Item('Sword', 'A sharp blade', 100);
  });

  describe('Constructor', () => {
    it('should create item with name, description, and value', () => {
      expect(item.name).toBe('Sword');
      expect(item.description).toBe('A sharp blade');
      expect(item.value).toBe(100);
    });

    it('should handle empty description', () => {
      const emptyDescItem = new Item('Potion', '', 25);
      expect(emptyDescItem.description).toBe('');
      expect(emptyDescItem.name).toBe('Potion');
    });

    it('should handle zero value', () => {
      const freeItem = new Item('Pebble', 'A worthless stone', 0);
      expect(freeItem.value).toBe(0);
    });

    it('should handle negative value', () => {
      const cursedItem = new Item('Cursed Ring', 'Brings misfortune', -50);
      expect(cursedItem.value).toBe(-50);
    });

    it('should handle large value', () => {
      const legendaryItem = new Item('Holy Grail', 'Legendary artifact', 999999);
      expect(legendaryItem.value).toBe(999999);
    });

    it('should have all properties defined', () => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('value');
    });
  });

  describe('Name Property', () => {
    it('should allow modifying name', () => {
      item.name = 'Great Sword';
      expect(item.name).toBe('Great Sword');
    });

    it('should handle single character name', () => {
      item.name = 'X';
      expect(item.name).toBe('X');
    });

    it('should handle very long name', () => {
      const longName = 'A'.repeat(100);
      item.name = longName;
      expect(item.name).toBe(longName);
      expect(item.name.length).toBe(100);
    });

    it('should handle special characters in name', () => {
      item.name = "Sword's Edge +5";
      expect(item.name).toBe("Sword's Edge +5");
    });

    it('should handle empty string (edge case)', () => {
      item.name = '';
      expect(item.name).toBe('');
    });
  });

  describe('Description Property', () => {
    it('should allow modifying description', () => {
      item.description = 'An extremely sharp blade crafted by master smiths';
      expect(item.description).toBe('An extremely sharp blade crafted by master smiths');
    });

    it('should handle multi-line description', () => {
      const multiLine = 'A powerful sword\nForged in ancient times\nGlows with magic';
      item.description = multiLine;
      expect(item.description).toBe(multiLine);
    });

    it('should preserve special markdown in description', () => {
      const formatted = '**Legendary** - *Increases damage by 50%*';
      item.description = formatted;
      expect(item.description).toBe(formatted);
    });

    it('should handle very long description', () => {
      const longDesc = 'Lorem ipsum dolor sit amet, '.repeat(20);
      item.description = longDesc;
      expect(item.description.length).toBeGreaterThan(100);
    });
  });

  describe('Value Property', () => {
    it('should allow modifying value', () => {
      item.value = 250;
      expect(item.value).toBe(250);
    });

    it('should handle increasing value', () => {
      item.value = 100;
      item.value = 200;
      item.value = 300;

      expect(item.value).toBe(300);
    });

    it('should handle decreasing value', () => {
      item.value = 100;
      item.value = 50;
      item.value = 25;

      expect(item.value).toBe(25);
    });

    it('should handle zero value', () => {
      item.value = 0;
      expect(item.value).toBe(0);
    });

    it('should handle negative value for cursed items', () => {
      item.value = -100;
      expect(item.value).toBe(-100);
    });

    it('should handle floating point value', () => {
      item.value = 99.99;
      expect(item.value).toBe(99.99);
    });

    it('should handle very large value', () => {
      item.value = 1000000;
      expect(item.value).toBe(1000000);
    });
  });

  describe('Common Item Types', () => {
    it('should create weapon items', () => {
      const sword = new Item('Longsword', 'A large two-handed sword', 150);
      const dagger = new Item('Dagger', 'A small concealable blade', 25);

      expect(sword.name).toBe('Longsword');
      expect(dagger.value).toBe(25);
    });

    it('should create armor items', () => {
      const plate = new Item('Plate Mail', 'Heavy armor for protection', 200);
      const leather = new Item('Leather Armor', 'Light flexible protection', 50);

      expect(plate.value).toBeGreaterThan(leather.value);
    });

    it('should create consumable items', () => {
      const potion = new Item('Health Potion', 'Restores 50 HP', 30);
      const elixir = new Item('Elixir of Wisdom', 'Permanently increases INT', 500);

      expect(potion.value).toBeLessThan(elixir.value);
    });

    it('should create treasure items', () => {
      const gold = new Item('Gold Coin', 'Currency', 1);
      const gem = new Item('Ruby', 'Precious gemstone', 500);
      const trophy = new Item('Dragon Scale', 'Rare trophy', 1000);

      expect(gold.value).toBeLessThan(gem.value);
      expect(gem.value).toBeLessThan(trophy.value);
    });

    it('should create miscellaneous items', () => {
      const rope = new Item('Rope (50ft)', 'Useful for climbing or binding', 10);
      const pick = new Item('Pickaxe', 'Mining tool', 20);
      const torch = new Item('Torch', 'Provides light', 1);

      expect(rope.name).toBe('Rope (50ft)');
      expect(pick.value).toBeGreaterThan(torch.value);
    });
  });

  describe('Multiple Items', () => {
    it('should create independent item instances', () => {
      const sword = new Item('Sword', 'Sharp', 100);
      const shield = new Item('Shield', 'Protective', 80);

      sword.value = 150;

      expect(sword.value).toBe(150);
      expect(shield.value).toBe(80);
    });

    it('should not share properties between instances', () => {
      const item1 = new Item('Item A', 'Description A', 10);
      const item2 = new Item('Item B', 'Description B', 20);

      item1.name = 'Modified A';
      item1.value = 999;

      expect(item2.name).toBe('Item B');
      expect(item2.value).toBe(20);
    });

    it('should allow creating inventory of items', () => {
      const inventory = [
        new Item('Sword', 'Sharp blade', 100),
        new Item('Shield', 'Protective wall', 80),
        new Item('Potion', 'Health restore', 30),
        new Item('Gold', 'Money', 1),
      ];

      expect(inventory.length).toBe(4);
      expect(inventory[0].name).toBe('Sword');
      expect(inventory[3].value).toBe(1);
    });

    it('should track total inventory value', () => {
      const items = [
        new Item('Item 1', 'Desc', 50),
        new Item('Item 2', 'Desc', 75),
        new Item('Item 3', 'Desc', 25),
      ];

      const totalValue = items.reduce((sum, item) => sum + item.value, 0);

      expect(totalValue).toBe(150);
    });
  });

  describe('Item Comparison', () => {
    it('should allow comparing item values', () => {
      const cheap = new Item('Rusty Sword', 'Old weapon', 10);
      const expensive = new Item('Legendary Sword', 'Best weapon', 1000);

      expect(expensive.value).toBeGreaterThan(cheap.value);
    });

    it('should allow finding highest value item', () => {
      const items = [
        new Item('Item A', 'Desc', 50),
        new Item('Item B', 'Desc', 200),
        new Item('Item C', 'Desc', 100),
      ];

      const maxValueItem = items.reduce((max, item) =>
        item.value > max.value ? item : max
      );

      expect(maxValueItem.name).toBe('Item B');
      expect(maxValueItem.value).toBe(200);
    });

    it('should allow sorting items by value', () => {
      const items = [
        new Item('Item A', 'Desc', 100),
        new Item('Item B', 'Desc', 30),
        new Item('Item C', 'Desc', 60),
      ];

      const sorted = [...items].sort((a, b) => a.value - b.value);

      expect(sorted[0].value).toBe(30);
      expect(sorted[1].value).toBe(60);
      expect(sorted[2].value).toBe(100);
    });
  });

  describe('Serialization', () => {
    it('should convert to JSON', () => {
      const json = JSON.stringify(item);
      expect(json).toContain('Sword');
      expect(json).toContain('100');
    });

    it('should parse from JSON', () => {
      const json = JSON.stringify(item);
      const parsed = JSON.parse(json);

      expect(parsed.name).toBe('Sword');
      expect(parsed.description).toBe('A sharp blade');
      expect(parsed.value).toBe(100);
    });

    it('should maintain data through serialization/deserialization', () => {
      const original = new Item('Magic Ring', 'Grants wishes', 5000);
      const json = JSON.stringify(original);
      const restored = JSON.parse(json);

      expect(restored.name).toBe(original.name);
      expect(restored.description).toBe(original.description);
      expect(restored.value).toBe(original.value);
    });
  });

  describe('Edge Cases', () => {
    it('should handle item with null description (if passed)', () => {
      // Testing robustness of the class
      const nullDescItem = new Item('Test', null, 100);
      expect(nullDescItem.description).toBe(null);
    });

    it('should handle very large integers', () => {
      item.value = Number.MAX_SAFE_INTEGER;
      expect(item.value).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle scientific notation value', () => {
      item.value = 1e10;
      expect(item.value).toBe(10000000000);
    });

    it('should handle NaN value (edge case)', () => {
      item.value = NaN;
      expect(isNaN(item.value)).toBe(true);
    });

    it('should handle Infinity as value', () => {
      item.value = Infinity;
      expect(item.value).toBe(Infinity);
    });

    it('should allow unicode characters in name and description', () => {
      item.name = '⚔️ Sword of Light 🧙';
      item.description = '魔法の剣 - Une épée magique';

      expect(item.name).toContain('⚔️');
      expect(item.description).toContain('魔法');
    });
  });

  describe('Item State Mutations', () => {
    it('should track multiple property changes', () => {
      expect(item.name).toBe('Sword');
      expect(item.value).toBe(100);

      item.name = 'Great Sword';
      item.value = 200;
      item.description = 'A master-crafted blade';

      expect(item.name).toBe('Great Sword');
      expect(item.value).toBe(200);
      expect(item.description).toBe('A master-crafted blade');
    });

    it('should handle rapid property changes', () => {
      item.value = 50;
      item.value = 75;
      item.value = 100;
      item.value = 125;
      item.value = 150;

      expect(item.value).toBe(150);
    });

    it('should maintain integrity after multiple operations', () => {
      const operations = [
        () => (item.name = 'Upgraded Sword'),
        () => (item.value += 50),
        () => (item.description = 'Enhanced blade'),
        () => (item.value *= 2),
        () => (item.name = 'Legend Sword'),
      ];

      operations.forEach(op => op());

      expect(item.name).toBe('Legend Sword');
      expect(item.value).toBe(300);
      expect(item.description).toBe('Enhanced blade');
    });
  });
});
