import { Dispatch, createContext } from 'react'
import { TransitState, TransitReducerActionType, TransitContextType } from './types'

export const TransitStateContext = createContext<TransitState | undefined>(undefined)
export const TransitContext = createContext<TransitContextType | undefined>(undefined)
export const TransitDispatchContext = createContext<undefined | Dispatch<TransitReducerActionType>>(undefined)
