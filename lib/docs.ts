import { CommandDocument, UserDocument } from './types';


/**
 * initializes new document from input
 * @param {CommandDocument} input
 * @returns {UserDocument}
 */
export function initDefaultDocument(input: CommandDocument): UserDocument {
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


/**
 *
 * @param {CommandDocument} input
 * @returns {UserDocument}
 */
export function updateTransactions(input: CommandDocument): UserDocument {
    return {} as UserDocument
}


/**
 *
 * @param {CommandDocument} input
 * @returns {UserDocument}
 */
export function updateDocument(document: UserDocument): UserDocument {
    return {} as UserDocument
}

/**
 *
 * @param {CommandDocument} input
 * @returns {UserDocument}
 */
// TODO: Add support to roll back a transaction
export function rollbackTransactions(input: CommandDocument): UserDocument {
    return {} as UserDocument
}