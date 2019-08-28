import React from 'react';
import { TransitWalletState, TransitWalletProvider } from './types';
declare type TransitProviderProps = {
    children: React.ReactNode;
    appname: string;
};
export declare function TransitProvider({ children, appname }: TransitProviderProps): JSX.Element;
export declare function useTransitState(): TransitWalletState;
export declare function useTransitDispatch(): {
    connectWallet: (provider: TransitWalletProvider) => Promise<void>;
    disconnectWallet: () => void;
};
export {};
