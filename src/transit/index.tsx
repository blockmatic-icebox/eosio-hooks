import React, {useMemo, Dispatch, createContext, useCallback, useReducer, useContext, useEffect } from 'react'

import { initAccessContext, Wallet } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import tokenPocket from 'eos-transit-scatter-provider'
import meetone from 'eos-transit-meetone-provider'
import lynx from 'eos-transit-lynx-provider'

import { TransitWalletState, TransitWalletProvider } from './types'

const TransitStateContext = createContext<undefined | TransitWalletState>(undefined)
const TransitDispatchContext = createContext<undefined | Dispatch<ActionType>>(undefined)

interface ActionType {
  type: 'CONNECT_WALLET_START' | 'CONNECT_WALLET' | 'DISCONNECT_WALLET' | 'CONNECT_ERROR'
  payload?: any
}

const transitReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'CONNECT_WALLET_START':
      console.log('CONNECT_WALLET_START')
      return {
        ...state,
        connecting: action.payload.provider,
        error: false,
      }

    case 'CONNECT_WALLET':
      return {
        ...state,
        connecting: null,
        wallet: action.payload.wallet,
        error: false,
      }

    case 'DISCONNECT_WALLET':
      return {
        connecting: null,
        wallet: null,
        error: false,
      }

    case 'CONNECT_ERROR':
      return {
        connecting: null,
        wallet: null,
        error: true,
      }

    default:
      throw new Error(`Invalid action: ${action.type}`)
  }
}

const walletProvider = localStorage.getItem('walletProvider')

let accessContext : any

const getWallet = (walletProvider: TransitWalletProvider): Promise<Wallet> => {
  const TransitWalletProvider = accessContext.getTransitWalletProvider()
  // @ts-ignore
  return accessContext.initWallet(TransitWalletProvider[providers.findIndex(p => p === walletProvider)])
}

const _connectWallet = async (provider: TransitWalletProvider, dispatch:Function) =>{
  dispatch({ type: 'CONNECT_WALLET_START', payload: { provider } })

  try {
    const wallet = await getWallet(provider)
    await wallet.connect()
    await wallet.login()

    dispatch({
      type: 'CONNECT_WALLET',
      payload: { wallet },
    })
    // persist provider
    localStorage.setItem('walletProvider', provider)
  } catch (err) {
    console.error('!!!!', err)
    dispatch({
      type: 'CONNECT_ERROR',
    })
  }
}

type TransitProviderProps = {
  children: React.ReactNode
  appname: string
}

export function TransitProvider({ children, appname }: TransitProviderProps) {
  const [state, dispatch] = useReducer(transitReducer, {
    connecting: false,
    wallet: null,
    error: null,
  })

  accessContext = useMemo( () => initAccessContext({
    appName: appname,
    network: {
      host: 'kylin.eoscanada.com',
      port: 443,
      protocol: 'https',
      chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    },
    walletProviders: [scatter(), tokenPocket(), lynx(), meetone()],
  }), [appname] )

  // reconnect
  useEffect(()=>{
    if(!walletProvider) return
    _connectWallet(walletProvider as TransitWalletProvider, dispatch)
  },[])

  return (
    <TransitStateContext.Provider value={state}>
      <TransitDispatchContext.Provider value={dispatch}>{children}</TransitDispatchContext.Provider>
    </TransitStateContext.Provider>
  )
}

// Transit State
export function useTransitState() {
  const state = useContext(TransitStateContext)

  if (state === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitState().')
  }

  return state
}

// Transit Dispatch
export function useTransitDispatch() {
  const dispatch = useContext(TransitDispatchContext)

  if (dispatch === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitDispatch().')
  }

  const connectWallet = useCallback(
    async (provider: TransitWalletProvider) => _connectWallet(provider, dispatch),
    [dispatch]
  )

  const disconnectWallet = useCallback(() => {
    dispatch({ type: 'DISCONNECT_WALLET' })
    localStorage.removeItem('walletProvider')
  }, [dispatch])

  return {
    connectWallet,
    disconnectWallet,
  }
}
