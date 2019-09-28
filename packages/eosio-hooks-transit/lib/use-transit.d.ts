export default function useTransit(): {
  connectWallet: (provider: import('./types').TransitWalletProvider) => Promise<void>;
  disconnectWallet: () => void;
  connectScatter: () => Promise<void>;
  connectLynx: () => Promise<void>;
  connectTokenPocket: () => Promise<void>;
  connectMeetOne: () => Promise<void>;
  transitState: import('./types').TransitState;
};
