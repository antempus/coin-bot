import { Operations } from './enums';
import { CommandDocument, UserDocument } from './types';

export function defaultDocument(input: CommandDocument): UserDocument {
    const { coinType, qty, operation, caller } = input
    return {
        id: input.target,
        coins: [{
            type: coinType,
            qty: qty
        }],
        history: [{
            coin: coinType,
            transactions: [{
                user: caller,
                time: Date.now(),
                qty,
                operation
            }]
        }]
    }
}