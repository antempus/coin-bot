import { Coins, Operations } from './enums';

import { CommandOpts } from './types';


/**
 * converts input string and converts to JSON with type/enum checks
 * Defaults coinType to {Coins.ANDYCOIN}
 * @param {string} input
 * @returns {CommandOpts}
 */
export function parseInputs(input: string): CommandOpts {
    const [target, operation, qty, coinType = Coins.ANDYCOIN] = input.split(" ");
    
    if (!Object.values(Operations).includes(operation as Operations)) {
        throw Error('`add` or `rm` only')
    }
    if (!Object.values(Coins).includes(coinType as Coins)) {
        throw Error('bad coin type')
    }
    if (!qty) {
        throw Error('coin qty shall not be null')
    }

    return {
        target,
        operation: Operations[operation],
        qty: parseInt(qty),
        coinType: Coins[coinType]
    }
}