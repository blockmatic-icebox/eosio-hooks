import React, { useCallback } from 'react'
import { TransitProvider, useTransitState, useTransit } from '@blockmatic/eosio-hooks'

function TransitData() {
  const state = useTransitState()
  const { connectScatter, disconnectWallet } = useTransit()
  const handleConnectScatter = useCallback(async () => {
    try {
      await connectScatter()
    } catch (err) {
      /* eslint-disable */
      console.log('catched', err)
      alert('Cannot connect to Scatter')
      /* eslint-enable */
    }
  }, [connectScatter])

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <br />
      <button onClick={handleConnectScatter}>Connect Scatter</button>
      <button onClick={disconnectWallet}>Disconnect Scatter</button>
    </div>
  )
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
  autoReconnect: false,
}

export default function App() {
  return (
    <TransitProvider config={transitConfig}>
      <div> Transit Hooks</div>
      <TransitData />
    </TransitProvider>
  )
}
