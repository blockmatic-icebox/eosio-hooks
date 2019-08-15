import { Wallet } from 'eos-transit'

export interface WalletStateType {
  wallet: null | Wallet
  connecting: null | string
  error: boolean
}

export interface WalletDispatchType {
  connect: (walletProvider: WalletProviders) => void
}

export type WalletProviders = 'scatter' | 'tokenpocket' | 'eoslynx' | 'meetone'
