import React from 'react';
import { TransitProvider, useTransitState, useTransit } from '@blockmatic/eosio-hooks';

function TransitData() {
  const state = useTransitState();
  const { connectWallet, disconnectWallet } = useTransit();

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <br />
      <button onClick={() => connectWallet('scatter')}>Connect Scatter</button>
      <button onClick={disconnectWallet}>Disconnect Scatter</button>
    </div>
  );
}

const transitConfig = {
  appName: 'Example',
  network: {
    host: 'jungle2.cryptolions.io',
    port: 80,
    protocol: 'http',
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
  },
  providers: ['scatter'],
};

export default function App() {
  return (
    <TransitProvider config={transitConfig}>
      <div> Transit Hooks</div>
      <TransitData />
    </TransitProvider>
  );
}
