import { useContext, useMemo } from 'react'
import { createDfuseClient } from '@dfuse/client'

import { DfuseConfigContext } from './dfuse-config.context'

export default function useDfuseConfig() {
  const config = useContext(DfuseConfigContext)

  if (config === undefined) {
    throw new Error('You should useDfuseConfig() within <DfuseProvider />')
  }

  if (!config.apiKey || !config.network) {
    throw new Error('missing dfuse configuration')
  }

  const client = useMemo(
    () =>
      createDfuseClient({
        apiKey: config.apiKey,
        network: config.network,
      }),
    [config.apiKey, config.network]
  )

  return client
}
