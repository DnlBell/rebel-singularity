import Armor from '../item/armor';

describe('Armor Class', () => {
  let armor;

  beforeEach(() => {
    armor = new Armor('Leather Armor', 50, 'Light and flexible protection', 11);
  });

  describe('Constructor', () => {
    it('should create armor with name, value, description, and armorClass', () => {
      expect(armor.name).toBe('Leather Armor');
      expect(armor.armorClass).toBe(11);
    });

    it('should inherit from Item', () => {
      expect(armor.name).toBeDefined();
      expect(armor.description).toBeDefined();
      expect(armor.value).toBeDefined();
    });

    it('should handle different armor class values', () => {
      const lightArmor = new Armor('Leather', 25, 'Light', 11);
      const mediumArmor = new Armor('Chain Mail', 75, 'Medium', 13);
      const heavyArmor = new Armor('Plate Mail', 500, 'Heavy', 18);
      const noArmor = new Armor('Cloth', 5, 'No protection', 10);

      expect(lightArmor.armorClass).toBe(11);
      expect(mediumArmor.armorClass).toBe(13);
      expect(heavyArmor.armorClass).toBe(18);
      expect(noArmor.armorClass).toBe(10);
    });

    it('should have all properties defined', () => {
      expect(armor).toHaveProperty('name');
      expect(armor).toHaveProperty('description');
      expect(armor).toHaveProperty('value');
      expect(armor).toHaveProperty('armorClass');
    });
  });

  describe('Armor Class Property', () => {
    it('should allow modifying armor class', () => {
      armor.armorClass = 15;
      expect(armor.armorClass).toBe(15);
    });

    it('should handle zero armor class', () => {
      armor.armorClass = 0;
      expect(armor.armorClass).toBe(0);
    });

    it('should handle negative armor class', () => {
      const magicalArmor = new Armor('Mithril Plate', 1000, 'Magical protection', -5);
      expect(magicalArmor.armorClass).toBe(-5);
    });

    it('should handle very high armor class', () => {
      const ultimateArmor = new Armor('Divine Plate', 5000, 'Best protection', 50);
      expect(ultimateArmor.armorClass).toBe(50);
    });
  });

  describe('Common Armor Types', () => {
    it('should create cloth armor (AC 10)', () => {
      const cloth = new Armor('Cloth Robes', 10, 'Minimal protection', 10);
      expect(cloth.armorClass).toBe(10);
    });

    it('should create leather armor (AC 11)', () => {
      const leather = new Armor('Leather Armor', 50, 'Light protection', 11);
      expect(leather.armorClass).toBe(11);
    });

    it('should create chain mail (AC 13)', () => {
      const chainMail = new Armor('Chain Mail', 150, 'Metal chain links', 13);
      expect(chainMail.armorClass).toBe(13);
    });

    it('should create plate mail (AC 18)', () => {
      const plate = new Armor('Plate Mail', 500, 'Full metal coverage', 18);
      expect(plate.armorClass).toBe(18);
    });
  });

  describe('Armor Protection Levels', () => {
    it('should track protection by comparing AC values', () => {
      const noArmor = new Armor('None', 0, 'No protection', 10);
      const light = new Armor('Light', 50, 'Some protection', 11);
      const heavy = new Armor('Heavy', 500, 'Excellent protection', 18);

      expect(noArmor.armorClass).toBeLessThan(light.armorClass);
      expect(light.armorClass).toBeLessThan(heavy.armorClass);
    });

    it('should compare expensive vs cheap armor', () => {
      const cheapArmor = new Armor('Poor Leather', 10, 'Cheap', 11);
      const expensiveArmor = new Armor('Enchanted Plate', 1000, 'Expensive', 20);

      expect(expensiveArmor.armorClass).toBeGreaterThan(cheapArmor.armorClass);
    });
  });

  describe('Multiple Armor Pieces', () => {
    it('should create independent armor instances', () => {
      const helmet = new Armor('Iron Helmet', 30, 'Head protection', 1);
      const chestplate = new Armor('Iron Chestplate', 100, 'Torso protection', 5);

      helmet.armorClass = 2;

      expect(helmet.armorClass).toBe(2);
      expect(chestplate.armorClass).toBe(5);
    });

    it('should not share properties between instances', () => {
      const armor1 = new Armor('Armor 1', 100, 'First set', 12);
      const armor2 = new Armor('Armor 2', 200, 'Second set', 15);

      expect(armor1.armorClass).toBe(12);
      expect(armor2.armorClass).toBe(15);
    });

    it('should track armor progression', () => {
      const beginner = [
        new Armor('Leather Cap', 5, 'Basic', 1),
        new Armor('Leather Tunic', 15, 'Basic', 2),
      ];

      const advanced = [
        new Armor('Mithril Crown', 200, 'Excellent', 3),
        new Armor('Mithril Plate', 500, 'Excellent', 6),
      ];

      const totalBeginner = beginner.reduce((sum, a) => sum + a.armorClass, 0);
      const totalAdvanced = advanced.reduce((sum, a) => sum + a.armorClass, 0);

      expect(totalBeginner).toBeLessThan(totalAdvanced);
    });
  });

  describe('Armor Comparison', () => {
    it('should compare armor AC values', () => {
      const weakArmor = new Armor('Rags', 0, 'Weak', 10);
      const strongArmor = new Armor('Plate Mail', 500, 'Strong', 18);

      expect(strongArmor.armorClass).toBeGreaterThan(weakArmor.armorClass);
    });

    it('should find best armor for protection', () => {
      const armors = [
        new Armor('Cloth', 5, 'Weak', 10),
        new Armor('Leather', 50, 'Light', 11),
        new Armor('Plate', 500, 'Heavy', 18),
      ];

      const bestArmor = armors.reduce((best, current) =>
        current.armorClass > best.armorClass ? current : best
      );

      expect(bestArmor.name).toBe('Plate');
      expect(bestArmor.armorClass).toBe(18);
    });
  });

  describe('Serialization', () => {
    it('should convert to JSON', () => {
      const json = JSON.stringify(armor);
      expect(json).toContain('Leather Armor');
      expect(json).toContain('armorClass');
    });

    it('should restore from JSON', () => {
      const json = JSON.stringify(armor);
      const restored = JSON.parse(json);

      expect(restored.name).toBe('Leather Armor');
      expect(restored.armorClass).toBe(11);
    });
  });

  describe('Edge Cases', () => {
    it('should handle fractional armor class', () => {
      armor.armorClass = 12.5;
      expect(armor.armorClass).toBe(12.5);
    });

    it('should handle very large armor class', () => {
      armor.armorClass = 999;
      expect(armor.armorClass).toBe(999);
    });

    it('should handle negative armor penalty', () => {
      const cursedArmor = new Armor('Cursed Plate', 100, 'Bad armor', -5);
      expect(cursedArmor.armorClass).toBe(-5);
    });

    it('should handle unicode characters', () => {
      armor.name = '⚔️ Legendary Plate 🛡️';
      expect(armor.name).toContain('⚔️');
    });
  });

  describe('Armor State Tracking', () => {
    it('should track armor modifications', () => {
      expect(armor.armorClass).toBe(11);

      armor.armorClass = 10;
      expect(armor.armorClass).toBe(10);

      armor.armorClass = 13;
      expect(armor.armorClass).toBe(13);
    });

    it('should support magical enchantment', () => {
      const basicArmor = new Armor('Iron Plate', 100, 'Normal', 13);
      const enhancedArmor = new Armor('+1 Iron Plate', 250, 'Enchanted', 14);
      const legendaryArmor = new Armor('+3 Iron Plate', 1000, 'Legendary', 16);

      expect(basicArmor.armorClass).toBeLessThan(enhancedArmor.armorClass);
      expect(enhancedArmor.armorClass).toBeLessThan(legendaryArmor.armorClass);
    });
  });

  describe('Armor and Character Integration', () => {
    it('should track armor effectiveness', () => {
      const weakArmor = new Armor('Cloth', 10, 'Poor protection', 10);
      const strongArmor = new Armor('Plate', 500, 'Excellent protection', 18);

      expect(strongArmor.armorClass).toBeGreaterThan(weakArmor.armorClass);
    });
  });
});
