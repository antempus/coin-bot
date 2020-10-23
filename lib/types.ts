import { Coins, Operations } from './enums';

export interface CommandOptions {
    target: string
    operation: Operations
    qty: number
    coinType: Coins
}
