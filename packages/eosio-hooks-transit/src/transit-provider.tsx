import React, { useMemo, useCallback, useEffect } from 'react'
import useLocalStorage from 'react-use-localstorage'
import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import tokenPocket from 'eos-transit-scatter-provider'
import meetone from 'eos-transit-meetone-provider'
import lynx from 'eos-transit-lynx-provider'

import { TransitStateContext, TransitDispatchContext, TransitContext } from './transit-context'
import useTransitReducer from './transit-reducer'
import { TransitProviderProps, TransitWalletProvider } from './types'

// TODO: review this function
const getWalletProviders = (providerList: Array<TransitWalletProvider>) => {
  const supportedProviders: any = {
    scatter: () => scatter(),
    tokenpocket: () => tokenPocket(),
    lynx: () => lynx(),
    meetone: () => meetone(),
  }
  return providerList.map((provider: string) => supportedProviders[provider]())
}

export default function TransitProvider({ children, config }: TransitProviderProps) {
  const [transitProvider, setTransitProvider] = useLocalStorage('wallet-provider', undefined)
  const [state, dispatch] = useTransitReducer()

  const accessContextConfig = useMemo(() => {
    const { appName, network } = config
    const walletProviders = getWalletProviders(config.providers as Array<TransitWalletProvider>)
    return {
      appName,
      network,
      walletProviders,
    }
  }, [config])

  const accessContext = useMemo(() => initAccessContext(accessContextConfig), [accessContextConfig])

  const connectWallet = useCallback(
    async (provider: TransitWalletProvider) => {
      dispatch({ type: 'CONNECT_WALLET_START', payload: { provider } })
      try {
        const TransitWalletProviders = accessContext.getWalletProviders()
        const providerIndex = config.providers.findIndex(p => p === provider)
        const wallet = accessContext.initWallet(TransitWalletProviders[providerIndex])
        await wallet.connect()
        await wallet.login()

        dispatch({
          type: 'CONNECT_WALLET',
          payload: { wallet },
        })
        // persist provider
        setTransitProvider(provider)
      } catch (err) {
        dispatch({ type: 'CONNECT_ERROR' })
        throw new Error(err)
      }
    },
    [dispatch, accessContext, config.providers, setTransitProvider],
  )

  const disconnectWallet = useCallback(() => {
    dispatch({ type: 'DISCONNECT_WALLET' })
    localStorage.removeItem('walletProvider')
  }, [dispatch])

  const connectScatter = useCallback(() => connectWallet('scatter'), [connectWallet])
  const connectLynx = useCallback(() => connectWallet('lynx'), [connectWallet])
  const connectMeetOne = useCallback(() => connectWallet('meetone'), [connectWallet])
  const connectTokenPocket = useCallback(() => connectWallet('tokenpocket'), [connectWallet])

  // reconnection to previusly used provider
  useEffect(() => {
    if (!transitProvider) return
    connectWallet(transitProvider as TransitWalletProvider)
  }, [transitProvider, connectWallet])

  return (
    <TransitContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        connectScatter,
        connectLynx,
        connectMeetOne,
        connectTokenPocket,
      }}
    >
      <TransitStateContext.Provider value={state}>
        <TransitDispatchContext.Provider value={dispatch}>{children}</TransitDispatchContext.Provider>
      </TransitStateContext.Provider>
    </TransitContext.Provider>
  )
}
