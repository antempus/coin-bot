import { v4 } from 'uuid'
import { Coins, Operations } from './enums';
import { CommandDocument, CommandOptions } from './types';
import { parse, ParsedQs } from 'qs';
import { Logger } from '@azure/functions';

/**
 * converts input string and converts to JSON with type/enum checks
 * Defaults coinType to {Coins.ANDYCOIN}
 * @param {string} input
 * @returns {CommandOpts}
 */
export function parseInputs(input: string): CommandOptions {
    const [dirtyTarget, operation, qty, coinType = Coins.ANDYCOIN] = input.split(" ");


    // clean up escaped target
    const target = dirtyTarget.replace('<',"").replace('>',"").replace('@',"").split('|')[0]

    console.log(target)
    if (!Object.keys(Operations).includes(operation.toUpperCase() as Operations)) {
        throw Error('`add` or `rm` only')
    }
    if (!Object.keys(Coins).includes(coinType.toUpperCase() as Coins)) {
        throw Error('bad coin type')
    }
    if (!qty) {
        throw Error('qty must be set')
    }

    return {
        target,
        operation: Operations[operation.toUpperCase()],
        qty: parseInt(qty),
        coinType: Coins[coinType.toUpperCase()]
    }
}

export function parseRawBody(log: Logger, rawBody?: any): CommandDocument | { body: string } {
if (rawBody) {
    const parsedBody: ParsedQs = parse(rawBody);
    const { text, user_id: caller } = parsedBody
    try {
        log.info('parsing input')
        const commandOpts = parseInputs(text)
        return {...commandOpts, id: v4(), caller}
    }
    catch (error) {
        log.error(`parsing error: ${error.message}`)
        throw error
    }
}
else {
    return {
        body: 'missing inputs'
    }
}
}