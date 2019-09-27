export declare function useTransit(): {
    connectWallet: (provider: import("./types").TransitWalletProvider) => Promise<void>;
    disconnectWallet: () => void;
    state: import("./types").TransitState;
};
