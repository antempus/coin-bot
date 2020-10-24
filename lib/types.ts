import { Coins, Operations } from './enums';

// properties required for setting up command operations
export interface CommandOptions {
    target: string
    operation: Operations
    qty: number
    coinType: Coins
}

// cosmos db structured properties
export interface CommandDocument extends CommandOptions {
    id: string,
    caller: string
}

export interface UserDocument {
    id: string,
    coins: CoinValues[]
}

export interface CoinValues {
    type: Coins,
    qty: number,
}