import React from 'react'
import { TransitProviderProps, LoginParams } from './types'
import useTransitReducer from './useTransitReducer'
import { TransitContext } from './TransitContext'
import { useLocalStorage } from 'react-use'

export const TransitProvider: React.FC<TransitProviderProps> = ({ children, accessContext, autoLogin = true }) => {
  const [state, dispatch] = useTransitReducer()
  const isFirstRender = React.useRef(true)
  const [activeProviderIndex, setActiveProviderIndex, removeActiveProviderIndex] = useLocalStorage<number>(
    'active-provider-index',
    state.activeProviderIndex,
  )

  const login = async ({ providerIndex, accountName, authorization }: LoginParams) => {
    try {
      dispatch({ type: 'LOGIN_START' })

      const selectedProvider = accessContext.getWalletProviders()[providerIndex]
      if (!selectedProvider) throw new Error('Invalid wallet provider index')

      const wallet = accessContext.initWallet(selectedProvider)

      if (accountName && authorization) await wallet.login(accountName, authorization)
      if (accountName && !authorization) await wallet.login(accountName)
      if (!accountName && !authorization) await wallet.login()

      setActiveProviderIndex(providerIndex)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { wallet } })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: { error } })
    }
  }

  const logout = async () => {
    await state.wallet?.logout()
    removeActiveProviderIndex()
    dispatch({ type: 'LOGOUT' })
  }

  React.useEffect(() => {
    if (!isFirstRender.current) return
    if (!state.accessContext) dispatch({ type: 'SET_ACCESS_CONTEXT', payload: { accessContext } })
    if (autoLogin && !state.wallet && activeProviderIndex !== undefined) login({ providerIndex: activeProviderIndex })
    isFirstRender.current = false
  })

  return <TransitContext.Provider value={{ ...state, login, logout }}>{children}</TransitContext.Provider>
}

export default TransitProvider
