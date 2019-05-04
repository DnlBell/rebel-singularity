import armor from '../models/item/armor.js'

/*
{armor}
Name
Value
Description
ArmorClass
*/

export const leatherJacket = () =>{
    const leatherJacket = new armor(
        'Leather Jacket',
        15,
        'test armor description',
        2
    );

    return leatherJacket;
}