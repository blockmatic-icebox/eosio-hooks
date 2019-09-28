import { useReducer } from 'react'
import { TransitReducerActionType } from './types'

const initialState = {
  connecting: false,
  wallet: null,
  error: null,
}

const transitReducer = (state: any, action: TransitReducerActionType) => {
  switch (action.type) {
    case 'CONNECT_WALLET_START':
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

export default function useTransitReducer() {
  return useReducer(transitReducer, initialState)
}
