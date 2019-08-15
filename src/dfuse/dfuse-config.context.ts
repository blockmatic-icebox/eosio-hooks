import { Dispatch, createContext } from 'react'

import { DfuseConfig, DfuseReducerActionType } from './types'

export const DfuseConfigContext = createContext<DfuseConfig | undefined>(undefined)
export const DfuseDispatchContext = createContext<undefined | Dispatch<DfuseReducerActionType>>(undefined)
