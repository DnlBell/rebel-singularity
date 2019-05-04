import weapon from '../models/item/weapon.js';

/*
{weapon}
Name
Description
Value
Damage die
Die ammount
Bonus
*/

export const steelBat = () => {
    const steelBat = new weapon(
        'Steel Bat',
        'Test description',
        10,
        8,
        1,
        0
    );

    return steelBat;
}