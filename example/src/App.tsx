import React from 'react'
import { useTransit, useTransitState, TransitProvider  } from '@blockmatic/eos-hooks'

function TransitData () {
  const state = useTransitState()
  const transit = useTransit()

  return (
    <div>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <br/>
      <pre>
        {JSON.stringify(transit, null, 2)}
      </pre>
    </div>
  )
}

export default function App (){
  return (
    <TransitProvider>
      <div>Transit Transit</div>
      <TransitData/>
    </TransitProvider>
  );
}

