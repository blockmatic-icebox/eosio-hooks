import React from 'react'
import { TransitProvider, useTransit } from '@blockmatic/eosio-hooks-transit'
import { initAccessContext } from 'eos-transit'
// import scatter from 'eos-transit-scatter-provider'
import tokenPocket from 'eos-transit-tokenpocket-provider'
// import meetone from 'eos-transit-meetone-provider'
// import lynx from 'eos-transit-lynx-provider'
// import ledger from 'eos-transit-ledger-provider'
// import anchorlink from 'eos-transit-anchorlink-provider'
// import keycat from 'eos-transit-keycat-provider'

function TransitData() {
  const { login, logout, ...state } = useTransit()

  return (
    <div style={{ paddingBottom: 100 }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <br />
      <button onClick={() => login({ providerIndex: 0 })}>Connect</button>
      <button onClick={() => logout()}>Disconnect</button>
    </div>
  )
}

const accessContext = initAccessContext({
  appName: 'eosio_hooks_example',
  network: {
    host: 'eos.greymass.com',
    port: 80,
    protocol: 'http',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  },
  walletProviders: [tokenPocket()],
})

const App = () => {
  return (
    <TransitProvider accessContext={accessContext}>
      <div> Transit Hooks</div>
      <TransitData />
    </TransitProvider>
  )
}

export default App
