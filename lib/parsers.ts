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
    const [_target = "", _operation = "", _qty = "", _coinType = ""] = input.split(" ");

    // convert to number
    const qty = parseInt(_qty);

    // uppercase input
    const operation = _operation.toUpperCase();

    // set default/uppercase input
    const coinType = _coinType ? _coinType.toUpperCase() : "ANDYCOIN"

    // clean up escaped target
    const target = _target.replace('<', "").replace('>', "").replace('@', "").split('|')[0]

    // validate inputs
    if (!Object.keys(Operations).includes(operation as Operations)) {
        throw Error('`add` or `rm` only');
    }
    if (!Object.keys(Coins).includes(coinType as Coins)) {
        throw Error('unregcognized coin type');
    }
    if (!qty) {
        throw Error('qty must be set')
    }
    if (qty <= 0) {
        throw Error('qty must be greater than 0')
    }
    if (!target) {
        throw Error('target must be slack user')
    }

    return {
        target,
        operation: Operations[operation],
        qty,
        coinType: Coins[coinType]
    }
}

export function parseRawBody(log: Logger, rawBody?: any): CommandDocument {
    if (rawBody) {
        const parsedBody: ParsedQs = parse(rawBody);
        const { text, user_id: caller } = parsedBody
        try {
            log.info('parsing input')
            const commandOpts = parseInputs(text)
            return { ...commandOpts, id: v4(), caller }
        }
        catch (error) {
            log.error(`input error: ${error.message}`)
            throw error
        }
    }
    else {
        throw Error('missing inputs')
    }
}