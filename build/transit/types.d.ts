import { Wallet } from 'eos-transit';
export interface TransitWalletState {
    wallet: null | Wallet;
    connecting: null | string;
    error: boolean;
}
export interface TransitWalletDispatch {
    connect: (walletProvider: TransitWalletProvider) => void;
}
export declare type TransitWalletProvider = 'scatter' | 'tokenpocket' | 'eoslynx' | 'meetone';
