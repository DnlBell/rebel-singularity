import Consumable from '../item/consumable';

describe('Consumable Class', () => {
  let consumable;

  beforeEach(() => {
    consumable = new Consumable('Health Potion', 'A shimmering red liquid', 25);
  });

  describe('Constructor', () => {
    it('should create consumable with name, description, and value', () => {
      expect(consumable.name).toBe('Health Potion');
      expect(consumable.description).toBe('A shimmering red liquid');
      expect(consumable.value).toBe(25);
    });

    it('should inherit from Item', () => {
      expect(consumable.name).toBeDefined();
      expect(consumable.description).toBeDefined();
      expect(consumable.value).toBeDefined();
    });

    it('should create different consumable types', () => {
      const healthPotion = new Consumable('Health Potion', 'Restores HP', 25);
      const manaPotion = new Consumable('Mana Potion', 'Restores MP', 30);
      const antidote = new Consumable('Antidote', 'Cures poison', 40);
      const scroll = new Consumable('Scroll of Fireball', 'Fire spell', 50);

      expect(healthPotion.name).toBe('Health Potion');
      expect(manaPotion.name).toBe('Mana Potion');
      expect(antidote.name).toBe('Antidote');
      expect(scroll.name).toBe('Scroll of Fireball');
    });

    it('should have all inherited properties defined', () => {
      expect(consumable).toHaveProperty('name');
      expect(consumable).toHaveProperty('description');
      expect(consumable).toHaveProperty('value');
    });
  });

  describe('Consumable Properties', () => {
    it('should allow modifying name', () => {
      consumable.name = 'Superior Health Potion';
      expect(consumable.name).toBe('Superior Health Potion');
    });

    it('should allow modifying description', () => {
      consumable.description = 'A powerful healing elixir';
      expect(consumable.description).toBe('A powerful healing elixir');
    });

    it('should allow modifying value', () => {
      consumable.value = 50;
      expect(consumable.value).toBe(50);
    });

    it('should allow adding custom effect properties', () => {
      consumable.effectType = 'heal';
      consumable.effectAmount = 20;
      consumable.hasCharges = 1;

      expect(consumable.effectType).toBe('heal');
      expect(consumable.effectAmount).toBe(20);
      expect(consumable.hasCharges).toBe(1);
    });
  });

  describe('Potion Types', () => {
    it('should create health potions', () => {
      const minorHealthPotion = new Consumable('Minor Health Potion', 'Restores 10 HP', 10);
      const standardHealthPotion = new Consumable('Health Potion', 'Restores 20 HP', 25);
      const majorHealthPotion = new Consumable('Major Health Potion', 'Restores 50 HP', 100);

      expect(minorHealthPotion.name).toContain('Health');
      expect(standardHealthPotion.value).toBeGreaterThan(minorHealthPotion.value);
      expect(majorHealthPotion.value).toBeGreaterThan(standardHealthPotion.value);
    });

    it('should create mana potions', () => {
      const minorManaPotion = new Consumable('Minor Mana Potion', 'Restores 10 MP', 10);
      const standardManaPotion = new Consumable('Mana Potion', 'Restores 20 MP', 30);
      const majorManaPotion = new Consumable('Major Mana Potion', 'Restores 50 MP', 120);

      expect(minorManaPotion.name).toContain('Mana');
      expect(standardManaPotion.value).toBeGreaterThan(minorManaPotion.value);
      expect(majorManaPotion.value).toBeGreaterThan(standardManaPotion.value);
    });

    it('should create buff potions', () => {
      const strengthPotion = new Consumable('Potion of Strength', 'Temporarily increases STR', 75);
      const agilityPotion = new Consumable('Potion of Agility', 'Temporarily increases DEX', 75);
      const endurancePotion = new Consumable('Potion of Endurance', 'Temporarily increases CON', 75);

      expect(strengthPotion.name).toContain('Strength');
      expect(agilityPotion.name).toContain('Agility');
      expect(endurancePotion.name).toContain('Endurance');
    });

    it('should create debuff remedy potions', () => {
      const antidote = new Consumable('Antidote', 'Cures poison', 50);
      const dispel = new Consumable('Dispel Potion', 'Removes curse', 50);
      const restoration = new Consumable('Restoration Potion', 'Removes all debuffs', 150);

      expect(antidote.name).toContain('Antidote');
      expect(dispel.name).toContain('Dispel');
      expect(restoration.name).toContain('Restoration');
    });

    it('should create spell scrolls', () => {
      const fireball = new Consumable('Scroll of Fireball', 'Cast Fireball spell', 100);
      const blizzard = new Consumable('Scroll of Blizzard', 'Cast Blizzard spell', 100);
      const heal = new Consumable('Scroll of Heal', 'Cast Heal spell', 75);

      expect(fireball.name).toContain('Fireball');
      expect(blizzard.name).toContain('Blizzard');
      expect(heal.name).toContain('Heal');
    });

    it('should create food items', () => {
      const bread = new Consumable('Bread', 'Basic food', 2);
      const meat = new Consumable('Roasted Meat', 'Good food', 5);
      const feast = new Consumable('Royal Feast', 'Luxurious meal', 500);

      expect(bread.value).toBeLessThan(meat.value);
      expect(meat.value).toBeLessThan(feast.value);
    });
  });

  describe('Consumable Usage', () => {
    it('should track consumption state', () => {
      const potion = new Consumable('Health Potion', 'Heals', 25);
      potion.isConsumed = false;

      expect(potion.isConsumed).toBe(false);

      potion.isConsumed = true;

      expect(potion.isConsumed).toBe(true);
    });

    it('should track charge counts', () => {
      const wand = new Consumable('Wand of Fireball', 'Reusable spell', 200);
      wand.charges = 5;

      expect(wand.charges).toBe(5);

      wand.charges = 4;
      expect(wand.charges).toBe(4);

      wand.charges = 0;
      expect(wand.charges).toBe(0);
    });

    it('should support stacking behavior', () => {
      const potions = [];

      for (let i = 0; i < 5; i++) {
        potions.push(new Consumable('Health Potion', 'Heals', 25));
      }

      expect(potions.length).toBe(5);

      // Use one potion
      potions.pop();

      expect(potions.length).toBe(4);
    });
  });

  describe('Multiple Consumables', () => {
    it('should create independent consumable instances', () => {
      const potion1 = new Consumable('Health Potion', 'Heals 20', 25);
      const potion2 = new Consumable('Mana Potion', 'Restores 20', 30);

      potion1.value = 50;

      expect(potion1.value).toBe(50);
      expect(potion2.value).toBe(30);
    });

    it('should not share properties between instances', () => {
      const consumable1 = new Consumable('Item 1', 'Desc', 10);
      const consumable2 = new Consumable('Item 2', 'Desc', 20);

      expect(consumable1.value).toBe(10);
      expect(consumable2.value).toBe(20);
    });

    it('should create inventory of consumables', () => {
      const inventory = [
        new Consumable('Health Potion', 'Heals 20', 25),
        new Consumable('Mana Potion', 'Restores 20', 30),
        new Consumable('Antidote', 'Cures poison', 50),
        new Consumable('Scroll of Fireball', 'Spell', 100),
      ];

      expect(inventory.length).toBe(4);
      expect(inventory[0].name).toBe('Health Potion');
      expect(inventory[3].value).toBe(100);
    });

    it('should support potion collection', () => {
      const potions = [
        new Consumable('Health Potion', 'Minor', 10),
        new Consumable('Health Potion', 'Standard', 25),
        new Consumable('Health Potion', 'Major', 50),
        new Consumable('Health Potion', 'Superior', 100),
      ];

      const totalValue = potions.reduce((sum, p) => sum + p.value, 0);

      expect(totalValue).toBe(185);
    });
  });

  describe('Consumable Effects', () => {
    it('should support effect tracking', () => {
      const potion = new Consumable('Health Potion', 'Heals', 25);
      potion.effect = {
        type: 'restore_hp',
        amount: 20,
        instant: true,
      };

      expect(potion.effect.type).toBe('restore_hp');
      expect(potion.effect.amount).toBe(20);
      expect(potion.effect.instant).toBe(true);
    });

    it('should support duration effects', () => {
      const buffPotion = new Consumable(
        'Potion of Strength',
        'Increases strength temporarily',
        75
      );
      buffPotion.effect = {
        type: 'stat_buff',
        stat: 'strength',
        amount: 5,
        duration: 300, // 5 minutes in seconds
      };

      expect(buffPotion.effect.duration).toBe(300);
    });

    it('should support complex multi-effect consumables', () => {
      const elixir = new Consumable('Elixir of Power', 'Powerful restoration', 500);
      elixir.effects = [
        { type: 'restore_hp', amount: 50 },
        { type: 'restore_mp', amount: 50 },
        { type: 'buff_strength', amount: 10, duration: 600 },
      ];

      expect(elixir.effects.length).toBe(3);
      expect(elixir.effects[0].amount).toBe(50);
    });
  });

  describe('Consumable Value and Rarity', () => {
    it('should price common consumables lower', () => {
      const common = new Consumable('Health Potion', 'Basic', 25);
      const uncommon = new Consumable('Superior Health Potion', 'Good', 75);
      const rare = new Consumable('Legendary Health Potion', 'Best', 500);

      expect(common.value).toBeLessThan(uncommon.value);
      expect(uncommon.value).toBeLessThan(rare.value);
    });

    it('should track rarity level', () => {
      const common = new Consumable('Common Potion', 'Basic', 10);
      common.rarity = 'common';

      const rare = new Consumable('Rare Potion', 'Special', 100);
      rare.rarity = 'rare';

      const legendary = new Consumable('Legendary Potion', 'Ultimate', 1000);
      legendary.rarity = 'legendary';

      expect(common.rarity).toBe('common');
      expect(rare.rarity).toBe('rare');
      expect(legendary.rarity).toBe('legendary');
    });
  });

  describe('Consumable Comparison', () => {
    it('should compare consumable values', () => {
      const cheapPotion = new Consumable('Weak Potion', 'Low quality', 5);
      const expensivePotion = new Consumable('Divine Elixir', 'Legendary', 500);

      expect(expensivePotion.value).toBeGreaterThan(cheapPotion.value);
    });

    it('should identify most valuable consumable in collection', () => {
      const consumables = [
        new Consumable('Health Potion', 'Basic', 25),
        new Consumable('Mana Potion', 'Basic', 30),
        new Consumable('Legendary Elixir', 'Best', 500),
        new Consumable('Antidote', 'Remedy', 50),
      ];

      const mostValuable = consumables.reduce((max, item) =>
        item.value > max.value ? item : max
      );

      expect(mostValuable.name).toBe('Legendary Elixir');
      expect(mostValuable.value).toBe(500);
    });
  });

  describe('Serialization', () => {
    it('should convert to JSON', () => {
      const potion = new Consumable('Health Potion', 'Heals 20', 25);
      potion.effect = { type: 'heal', amount: 20 };

      const json = JSON.stringify(potion);

      expect(json).toContain('Health Potion');
      expect(json).toContain('heal');
    });

    it('should restore from JSON', () => {
      const original = new Consumable('Mana Potion', 'Restores mana', 30);
      original.effect = { type: 'restore_mp', amount: 20 };

      const json = JSON.stringify(original);
      const restored = JSON.parse(json);

      expect(restored.name).toBe('Mana Potion');
      expect(restored.value).toBe(30);
      expect(restored.effect.type).toBe('restore_mp');
    });

    it('should maintain properties through serialization', () => {
      consumable.effect = {
        type: 'heal',
        amount: 20,
        instant: true,
      };

      const json = JSON.stringify(consumable);
      const restored = JSON.parse(json);

      expect(restored.name).toBe(consumable.name);
      expect(restored.description).toBe(consumable.description);
      expect(restored.value).toBe(consumable.value);
      expect(restored.effect.amount).toBe(20);
    });
  });

  describe('Edge Cases', () => {
    it('should handle consumable with zero value', () => {
      const freeItem = new Consumable('Worthless Potion', 'No value', 0);
      expect(freeItem.value).toBe(0);
    });

    it('should handle consumable with negative value', () => {
      const cursedPotion = new Consumable('Cursed Potion', 'Bad effect', -50);
      expect(cursedPotion.value).toBe(-50);
    });

    it('should handle very large stack of consumables', () => {
      const bigStack = [];

      for (let i = 0; i < 1000; i++) {
        bigStack.push(new Consumable('Potion', 'Test', 10));
      }

      expect(bigStack.length).toBe(1000);
      expect(bigStack[999].name).toBe('Potion');
    });

    it('should handle unicode in names', () => {
      const potion = new Consumable('⚗️ Potion of Power 💪', 'Magical brew', 100);
      expect(potion.name).toContain('⚗️');
    });

    it('should handle undefined effects gracefully', () => {
      const potion = new Consumable('Simple Potion', 'No effect', 10);
      expect(potion.effect).toBeUndefined();

      potion.effect = { type: 'heal', amount: 15 };
      expect(potion.effect).toBeDefined();
    });
  });

  describe('Consumable State Management', () => {
    it('should track consumption lifecycle', () => {
      const potion = new Consumable('Health Potion', 'Heals', 25);
      potion.quantity = 5;

      expect(potion.quantity).toBe(5);

      potion.quantity = 4;
      expect(potion.quantity).toBe(4);

      potion.quantity = 0;
      expect(potion.quantity).toBe(0);
    });

    it('should support batch consumption', () => {
      const potions = Array.from({ length: 10 }, () =>
        new Consumable('Health Potion', 'Heals', 25)
      );

      expect(potions.length).toBe(10);

      // Use 3 potions
      potions.splice(0, 3);

      expect(potions.length).toBe(7);
    });
  });
});
