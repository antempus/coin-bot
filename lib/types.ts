import { Coins, Operations } from './enums';

export interface CommandOpts {
    target: string
    operation: Operations
    qty: number
    coinType: Coins
}
