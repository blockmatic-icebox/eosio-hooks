import React from 'react'
import { TransitState, TransitReducerAction } from './types'

const transitReducer = (state: TransitState, action: TransitReducerAction): TransitState => {
  switch (action.type) {
    case 'SET_ACCESS_CONTEXT':
      return {
        ...state,
        accessContext: action.payload.accessContext,
      }

    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        wallet: action.payload.wallet,
        error: null,
      }

    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        wallet: null,
        error: null,
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        wallet: null,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export const initialState: TransitState = {
  wallet: null,
  loading: false,
  error: null,
  accessContext: null,
  activeProviderIndex: undefined,
}

const useTransitReducer = () => {
  return React.useReducer(transitReducer, initialState)
}

export default useTransitReducer
