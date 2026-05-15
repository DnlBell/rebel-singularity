import Weapon from '../item/weapon';

describe('Weapon Class', () => {
  let weapon;

  beforeEach(() => {
    weapon = new Weapon('Iron Sword', 'A sturdy iron blade', 50, 6, 1, 2);
  });

  describe('Constructor', () => {
    it('should create weapon with name, description, value, and damage properties', () => {
      expect(weapon.name).toBe('Iron Sword');
      expect(weapon.description).toBe('A sturdy iron blade');
      expect(weapon.value).toBe(50);
      expect(weapon.damageDie).toBe(6);
      expect(weapon.dieAmmount).toBe(1);
      expect(weapon.bonus).toBe(2);
    });

    it('should inherit from Item', () => {
      expect(weapon.name).toBeDefined();
      expect(weapon.description).toBeDefined();
      expect(weapon.value).toBeDefined();
    });

    it('should handle different damage die types', () => {
      const d4Weapon = new Weapon('Dagger', 'Small blade', 10, 4, 1, 0);
      const d8Weapon = new Weapon('Longsword', 'Medium blade', 75, 8, 1, 1);
      const d12Weapon = new Weapon('Greataxe', 'Large axe', 200, 12, 2, 3);
      const d20Weapon = new Weapon('Legendary Sword', 'Epic weapon', 5000, 20, 1, 5);

      expect(d4Weapon.damageDie).toBe(4);
      expect(d8Weapon.damageDie).toBe(8);
      expect(d12Weapon.damageDie).toBe(12);
      expect(d20Weapon.damageDie).toBe(20);
    });

    it('should handle different die amounts', () => {
      const singleDie = new Weapon('Normal', 'Desc', 50, 6, 1, 0);
      const twoD6 = new Weapon('Flail', 'Desc', 80, 6, 2, 0);
      const twoD8 = new Weapon('Dual Swords', 'Desc', 150, 8, 2, 2);
      const threeD6 = new Weapon('Massive Sword', 'Desc', 300, 6, 3, 5);

      expect(singleDie.dieAmmount).toBe(1);
      expect(twoD6.dieAmmount).toBe(2);
      expect(twoD8.dieAmmount).toBe(2);
      expect(threeD6.dieAmmount).toBe(3);
    });

    it('should handle zero bonus', () => {
      const noBonus = new Weapon('Basic Sword', 'No bonus', 25, 6, 1, 0);
      expect(noBonus.bonus).toBe(0);
    });

    it('should handle negative bonus', () => {
      const cursedWeapon = new Weapon('Cursed Blade', 'Bad weapon', 10, 6, 1, -5);
      expect(cursedWeapon.bonus).toBe(-5);
    });

    it('should handle large bonus values', () => {
      const legendaryWeapon = new Weapon('Holy Avenger', 'Legendary', 10000, 8, 1, 20);
      expect(legendaryWeapon.bonus).toBe(20);
    });

    it('should have all properties defined', () => {
      expect(weapon).toHaveProperty('name');
      expect(weapon).toHaveProperty('description');
      expect(weapon).toHaveProperty('value');
      expect(weapon).toHaveProperty('damageDie');
      expect(weapon).toHaveProperty('dieAmmount');
      expect(weapon).toHaveProperty('bonus');
    });
  });

  describe('Damage Calculation', () => {
    it('should provide damage range (min)', () => {
      // 1d6 + 2: min = 1 + 2 = 3
      const minDamage = weapon.dieAmmount * 1 + weapon.bonus;
      expect(minDamage).toBe(3);
    });

    it('should provide damage range (max)', () => {
      // 1d6 + 2: max = 1 * 6 + 2 = 8
      const maxDamage = weapon.dieAmmount * weapon.damageDie + weapon.bonus;
      expect(maxDamage).toBe(8);
    });

    it('should calculate correct range for 2d6 + 3', () => {
      const twoD6Weapon = new Weapon('Flail', 'Two dice weapon', 100, 6, 2, 3);
      const minDamage = twoD6Weapon.dieAmmount * 1 + twoD6Weapon.bonus;
      const maxDamage = twoD6Weapon.dieAmmount * twoD6Weapon.damageDie + twoD6Weapon.bonus;

      expect(minDamage).toBe(5); // 2 + 3
      expect(maxDamage).toBe(15); // 12 + 3
    });

    it('should calculate correct range for d20 + 5', () => {
      const d20Weapon = new Weapon('Legendary', 'Powerful', 5000, 20, 1, 5);
      const minDamage = d20Weapon.dieAmmount * 1 + d20Weapon.bonus;
      const maxDamage = d20Weapon.dieAmmount * d20Weapon.damageDie + d20Weapon.bonus;

      expect(minDamage).toBe(6); // 1 + 5
      expect(maxDamage).toBe(25); // 20 + 5
    });

    it('should handle negative bonus in damage calculation', () => {
      const cursedWeapon = new Weapon('Cursed', 'Bad', 10, 6, 1, -3);
      const minDamage = cursedWeapon.dieAmmount * 1 + cursedWeapon.bonus;
      const maxDamage = cursedWeapon.dieAmmount * cursedWeapon.damageDie + cursedWeapon.bonus;

      expect(minDamage).toBe(-2); // 1 - 3
      expect(maxDamage).toBe(3); // 6 - 3
    });
  });

  describe('Weapon Properties Modification', () => {
    it('should allow modifying damage die', () => {
      weapon.damageDie = 8;
      expect(weapon.damageDie).toBe(8);
    });

    it('should allow modifying die amount', () => {
      weapon.dieAmmount = 2;
      expect(weapon.dieAmmount).toBe(2);
    });

    it('should allow modifying bonus', () => {
      weapon.bonus = 5;
      expect(weapon.bonus).toBe(5);
    });

    it('should allow modifying inherited properties', () => {
      weapon.name = 'Enhanced Iron Sword';
      weapon.value = 100;
      weapon.description = 'An enchanted blade';

      expect(weapon.name).toBe('Enhanced Iron Sword');
      expect(weapon.value).toBe(100);
      expect(weapon.description).toBe('An enchanted blade');
    });
  });

  describe('Common Weapon Types', () => {
    it('should create dagger (1d4)', () => {
      const dagger = new Weapon('Dagger', 'Small concealable blade', 10, 4, 1, 0);
      const maxDamage = dagger.dieAmmount * dagger.damageDie + dagger.bonus;

      expect(dagger.damageDie).toBe(4);
      expect(maxDamage).toBe(4);
    });

    it('should create shortbow (1d6)', () => {
      const bow = new Weapon('Shortbow', 'Quick ranged weapon', 25, 6, 1, 0);
      const maxDamage = bow.dieAmmount * bow.damageDie + bow.bonus;

      expect(bow.damageDie).toBe(6);
      expect(maxDamage).toBe(6);
    });

    it('should create longsword (1d8)', () => {
      const longsword = new Weapon('Longsword', 'Versatile blade', 75, 8, 1, 1);
      const maxDamage = longsword.dieAmmount * longsword.damageDie + longsword.bonus;

      expect(longsword.damageDie).toBe(8);
      expect(maxDamage).toBe(9);
    });

    it('should create greataxe (2d12)', () => {
      const greataxe = new Weapon('Greataxe', 'Large two-handed weapon', 200, 12, 2, 3);
      const maxDamage = greataxe.dieAmmount * greataxe.damageDie + greataxe.bonus;

      expect(greataxe.damageDie).toBe(12);
      expect(greataxe.dieAmmount).toBe(2);
      expect(maxDamage).toBe(27);
    });

    it('should handle magical weapons with high bonus', () => {
      const flametounge = new Weapon('+3 Flaming Longsword', 'Magical blade', 1000, 8, 1, 8);
      const maxDamage = flametounge.dieAmmount * flametounge.damageDie + flametounge.bonus;

      expect(flametounge.bonus).toBe(8);
      expect(maxDamage).toBe(16);
    });
  });

  describe('Weapon Comparison', () => {
    it('should compare weapon damage potential', () => {
      const weakWeapon = new Weapon('Dagger', 'Weak', 10, 4, 1, 0);
      const strongWeapon = new Weapon('Greataxe', 'Strong', 200, 12, 2, 3);

      const weakMax = weakWeapon.dieAmmount * weakWeapon.damageDie + weakWeapon.bonus;
      const strongMax = strongWeapon.dieAmmount * strongWeapon.damageDie + strongWeapon.bonus;

      expect(weakMax).toBeLessThan(strongMax);
    });

    it('should compare weapon cost', () => {
      const cheapWeapon = new Weapon('Rusty Sword', 'Old', 5, 6, 1, -1);
      const expensiveWeapon = new Weapon('Holy Avenger', 'Legendary', 5000, 8, 1, 10);

      expect(cheapWeapon.value).toBeLessThan(expensiveWeapon.value);
    });
  });

  describe('Multiple Weapons', () => {
    it('should create independent weapon instances', () => {
      const sword = new Weapon('Sword', 'Blade', 50, 6, 1, 2);
      const axe = new Weapon('Axe', 'Chopper', 60, 8, 1, 1);

      sword.bonus = 10;

      expect(sword.bonus).toBe(10);
      expect(axe.bonus).toBe(1);
    });

    it('should not share properties between instances', () => {
      const weapon1 = new Weapon('Weapon 1', 'Desc', 50, 6, 1, 2);
      const weapon2 = new Weapon('Weapon 2', 'Desc', 75, 8, 1, 3);

      expect(weapon1.damageDie).toBe(6);
      expect(weapon2.damageDie).toBe(8);
    });

    it('should create arsenal of weapons', () => {
      const arsenal = [
        new Weapon('Dagger', 'Small', 10, 4, 1, 0),
        new Weapon('Sword', 'Medium', 50, 6, 1, 2),
        new Weapon('Greatsword', 'Large', 150, 10, 1, 3),
        new Weapon('Greataxe', 'Huge', 200, 12, 2, 3),
      ];

      expect(arsenal.length).toBe(4);
      expect(arsenal[0].damageDie).toBe(4);
      expect(arsenal[3].dieAmmount).toBe(2);
    });
  });

  describe('Weapon Progression', () => {
    it('should track weapon upgrades', () => {
      const basicSword = new Weapon('Iron Sword', 'Basic', 50, 6, 1, 0);
      expect(basicSword.bonus).toBe(0);

      const enhancedSword = new Weapon('+1 Iron Sword', 'Enhanced', 100, 6, 1, 1);
      expect(enhancedSword.bonus).toBe(1);

      const magicalSword = new Weapon('+3 Iron Sword', 'Magical', 300, 6, 1, 3);
      expect(magicalSword.bonus).toBe(3);
    });
  });

  describe('Serialization', () => {
    it('should convert to JSON', () => {
      const json = JSON.stringify(weapon);

      expect(json).toContain('Iron Sword');
      expect(json).toContain('damageDie');
      expect(json).toContain('dieAmmount');
      expect(json).toContain('bonus');
    });

    it('should restore from JSON', () => {
      const json = JSON.stringify(weapon);
      const restored = JSON.parse(json);

      expect(restored.name).toBe('Iron Sword');
      expect(restored.damageDie).toBe(6);
      expect(restored.dieAmmount).toBe(1);
      expect(restored.bonus).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle d1 weapon (though unusual)', () => {
      const d1Weapon = new Weapon('Stick', 'Not useful', 1, 1, 1, 0);
      const maxDamage = d1Weapon.dieAmmount * d1Weapon.damageDie + d1Weapon.bonus;

      expect(maxDamage).toBe(1);
    });

    it('should handle very large damage dice', () => {
      const d100Weapon = new Weapon('Ultimate Weapon', 'Overpowered', 9999, 100, 1, 50);
      const maxDamage = d100Weapon.dieAmmount * d100Weapon.damageDie + d100Weapon.bonus;

      expect(maxDamage).toBe(150);
    });

    it('should handle many dice rolls', () => {
      const manyDiceWeapon = new Weapon('Dice Roller', 'Many dice', 500, 6, 10, 5);
      const maxDamage = manyDiceWeapon.dieAmmount * manyDiceWeapon.damageDie + manyDiceWeapon.bonus;

      expect(maxDamage).toBe(65); // 10*6 + 5
    });
  });
});
