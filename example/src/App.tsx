import { TransitProvider } from "@blockmatic/eosio-hooks-transit";
import { initAccessContext } from "eos-transit";

import { TransitData } from "./TransitData";
import anchor from "eos-transit-anchorlink-provider";

// import meetone from 'eos-transit-meetone-provider'
// import lynx from 'eos-transit-lynx-provider'
// import ledger from 'eos-transit-ledger-provider'
// import tokenPocket from "eos-transit-tokenpocket-provider";
// import keycat from 'eos-transit-keycat-provider'

const accessContext = initAccessContext({
  appName: "eosio_hooks_example",
  network: {
    host: "eos.greymass.com",
    port: 80,
    protocol: "http",
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  },
  walletProviders: [anchor("eosio_hooks_example")],
});

const App = () => {
  return (
    <TransitProvider accessContext={accessContext}>
      <div> Transit Hooks</div>
      <TransitData />
    </TransitProvider>
  );
};

export default App;
