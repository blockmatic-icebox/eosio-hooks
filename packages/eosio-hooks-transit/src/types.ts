import { Wallet, WalletAccessContext } from 'eos-transit'

export type ExtendableError = Error & Record<string, any>

export type TransitReducerAction = {
  type: 'SET_ACCESS_CONTEXT' | 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGOUT' | 'LOGIN_ERROR'
  payload?: any
}

export interface TransitState {
  wallet: Wallet | null
  loading: boolean
  error: ExtendableError | null
  activeProviderIndex: number | null
  autoLogin: boolean
  accessContext: WalletAccessContext | null
}

export interface LoginParams {
  providerIndex: number
  accountName?: string
  authorization?: string
}

export interface TransitProviderProps {
  accessContext: WalletAccessContext
}

export interface TransitContextType extends TransitState {
  login: (params: LoginParams) => Promise<void>
  logout: () => Promise<void>
}
