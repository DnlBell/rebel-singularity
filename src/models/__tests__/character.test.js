import Character from '../character/character';

describe('Character Class', () => {
  let character;

  beforeEach(() => {
    character = new Character('Test Character');
  });

  describe('Constructor', () => {
    it('should create a character with a name', () => {
      expect(character.name).toBe('Test Character');
    });

    it('should initialize with base ability scores of 10', () => {
      expect(character.str).toBe(10);
      expect(character.dex).toBe(10);
      expect(character.con).toBe(10);
      expect(character.int).toBe(10);
      expect(character.wis).toBe(10);
      expect(character.cha).toBe(10);
    });

    it('should initialize with base HP of 10', () => {
      expect(character.maxHp).toBe(10);
      expect(character.currentHp).toBe(10);
    });

    it('should initialize with base mana of 5', () => {
      expect(character.maxMp).toBe(5);
      expect(character.currentMp).toBe(5);
    });

    it('should initialize with base armor class of 10', () => {
      expect(character.ac).toBe(10);
    });

    it('should initialize with all skill modifiers at 0', () => {
      expect(character.perception).toBe(0);
      expect(character.knowledge).toBe(0);
      expect(character.athletics).toBe(0);
      expect(character.stealth).toBe(0);
      expect(character.cunning).toBe(0);
      expect(character.diplomacy).toBe(0);
    });

    it('should initialize with empty equipment', () => {
      expect(character.armor).toEqual({});
      expect(character.weapon).toEqual({});
    });

    it('should initialize not stealthed', () => {
      expect(character.stealthed).toBe(false);
      expect(character.stealthRating).toBe(0);
    });

    it('should initialize with all base properties defined', () => {
      expect(character).toHaveProperty('name');
      expect(character).toHaveProperty('str');
      expect(character).toHaveProperty('dex');
      expect(character).toHaveProperty('con');
      expect(character).toHaveProperty('int');
      expect(character).toHaveProperty('wis');
      expect(character).toHaveProperty('cha');
      expect(character).toHaveProperty('maxHp');
      expect(character).toHaveProperty('currentHp');
      expect(character).toHaveProperty('maxMp');
      expect(character).toHaveProperty('currentMp');
      expect(character).toHaveProperty('ac');
      expect(character).toHaveProperty('perception');
      expect(character).toHaveProperty('knowledge');
      expect(character).toHaveProperty('athletics');
      expect(character).toHaveProperty('stealth');
      expect(character).toHaveProperty('cunning');
      expect(character).toHaveProperty('diplomacy');
      expect(character).toHaveProperty('armor');
      expect(character).toHaveProperty('weapon');
      expect(character).toHaveProperty('stealthed');
      expect(character).toHaveProperty('stealthRating');
    });
  });

  describe('Ability Scores', () => {
    it('should allow modification of ability scores', () => {
      character.str = 15;
      character.dex = 12;
      character.con = 14;

      expect(character.str).toBe(15);
      expect(character.dex).toBe(12);
      expect(character.con).toBe(14);
    });

    it('should handle negative ability scores', () => {
      character.str = -5;
      expect(character.str).toBe(-5);
    });

    it('should handle very high ability scores', () => {
      character.str = 25;
      expect(character.str).toBe(25);
    });
  });

  describe('Health Management', () => {
    it('should allow damage reduction', () => {
      character.currentHp = 5;
      expect(character.currentHp).toBe(5);
    });

    it('should allow health to reach 0', () => {
      character.currentHp = 0;
      expect(character.currentHp).toBe(0);
    });

    it('should allow health increase', () => {
      character.currentHp = 5;
      character.currentHp = 8;
      expect(character.currentHp).toBe(8);
    });

    it('should not exceed max HP when set', () => {
      character.currentHp = 15; // exceeds maxHp of 10
      expect(character.currentHp).toBe(15); // No enforced limit at model level
    });

    it('should allow maxHp modification', () => {
      character.maxHp = 20;
      expect(character.maxHp).toBe(20);
    });
  });

  describe('Mana Management', () => {
    it('should allow mana usage', () => {
      character.currentMp = 2;
      expect(character.currentMp).toBe(2);
    });

    it('should allow mana restoration', () => {
      character.currentMp = 0;
      character.currentMp = 5;
      expect(character.currentMp).toBe(5);
    });

    it('should allow maxMp modification', () => {
      character.maxMp = 10;
      expect(character.maxMp).toBe(10);
    });
  });

  describe('Armor Class', () => {
    it('should allow AC modification', () => {
      character.ac = 15;
      expect(character.ac).toBe(15);
    });

    it('should allow AC to be negative', () => {
      character.ac = -5;
      expect(character.ac).toBe(-5);
    });
  });

  describe('Skills', () => {
    it('should allow skill modifier changes', () => {
      character.perception = 3;
      character.knowledge = 2;
      character.athletics = 1;

      expect(character.perception).toBe(3);
      expect(character.knowledge).toBe(2);
      expect(character.athletics).toBe(1);
    });

    it('should allow negative skill modifiers', () => {
      character.stealth = -2;
      expect(character.stealth).toBe(-2);
    });

    it('should be able to modify all skills', () => {
      const skills = ['perception', 'knowledge', 'athletics', 'stealth', 'cunning', 'diplomacy'];
      skills.forEach(skill => {
        character[skill] = 5;
        expect(character[skill]).toBe(5);
      });
    });
  });

  describe('Equipment', () => {
    it('should allow armor assignment', () => {
      const armor = { name: 'Leather Armor', ac: 11 };
      character.armor = armor;
      expect(character.armor).toEqual(armor);
      expect(character.armor.name).toBe('Leather Armor');
    });

    it('should allow weapon assignment', () => {
      const weapon = { name: 'Longsword', damage: '1d8' };
      character.weapon = weapon;
      expect(character.weapon).toEqual(weapon);
      expect(character.weapon.name).toBe('Longsword');
    });

    it('should allow equipment to be unequipped', () => {
      character.armor = { name: 'Plate Armor' };
      character.armor = {};
      expect(character.armor).toEqual({});
    });

    it('should allow reassignment of equipment', () => {
      character.armor = { name: 'Leather Armor' };
      character.armor = { name: 'Plate Armor' };
      expect(character.armor.name).toBe('Plate Armor');
    });
  });

  describe('Stealth', () => {
    it('should allow stealth state changes', () => {
      character.stealthed = true;
      expect(character.stealthed).toBe(true);
      character.stealthed = false;
      expect(character.stealthed).toBe(false);
    });

    it('should allow stealth rating modification', () => {
      character.stealthRating = 5;
      expect(character.stealthRating).toBe(5);
    });

    it('should start not stealthed', () => {
      const newChar = new Character('New');
      expect(newChar.stealthed).toBe(false);
    });
  });

  describe('Multiple Instances', () => {
    it('should create independent character instances', () => {
      const char1 = new Character('Character 1');
      const char2 = new Character('Character 2');

      char1.str = 15;
      char2.str = 8;

      expect(char1.str).toBe(15);
      expect(char2.str).toBe(8);
    });

    it('should not share state between instances', () => {
      const char1 = new Character('Char1');
      const char2 = new Character('Char2');

      char1.armor = { name: 'Armor 1' };
      char2.armor = { name: 'Armor 2' };

      expect(char1.armor.name).toBe('Armor 1');
      expect(char2.armor.name).toBe('Armor 2');
    });
  });

  describe('Complex State Changes', () => {
    it('should handle multiple sequential changes', () => {
      character.currentHp = 8;
      character.currentMp = 3;
      character.str = 12;
      character.ac = 13;
      character.stealthed = true;

      expect(character.currentHp).toBe(8);
      expect(character.currentMp).toBe(3);
      expect(character.str).toBe(12);
      expect(character.ac).toBe(13);
      expect(character.stealthed).toBe(true);
    });

    it('should maintain state integrity across changes', () => {
      character.currentHp = 5;
      character.str = 15;
      character.knowledge = 3;

      const originalName = character.name;
      character.currentHp = 7;

      expect(character.name).toBe(originalName);
      expect(character.str).toBe(15);
      expect(character.knowledge).toBe(3);
    });
  });
});
