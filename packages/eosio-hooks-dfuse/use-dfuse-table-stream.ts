import { useReducer, useRef, useCallback } from 'react'
import { Stream, GetTableRowsMessageData } from '@dfuse/client'
import isEqual from 'lodash.isequal'

import useDfuseClient from './use-dfuse-client'
import { DfuseReducerActionType } from './types'

const dfuseTableReducer = (state: any, action: DfuseReducerActionType) => {
  switch (action.type) {
    case 'DFUSE_LISTENING':
      // console.log('DFUSE_LISTENING')
      return state

    case 'DFUSE_SNAPSHOT':
      // console.log('DFUSE_SNAPSHOT')
      const tableSnapshotData = action.payload.data.rows
      return tableSnapshotData

    case 'DFUSE_INSERT':
      // console.log('DFUSE_INSERT')
      return [action.payload.data.dbop.new.json, ...state]

    case 'DFUSE_REMOVE':
      // console.log('DFUSE_REMOVE')
      const deletedRow: any = action.payload.data.dbop.old.json
      return state.filter((row: any) => row !== deletedRow)

    case 'DFUSE_UPDATE':
      // console.log('DFUSE_UPDATE')
      const oldRow: any = action.payload.data.dbop.old.json
      const updatedRow: any = action.payload.data.dbop.new.json
      return state.map((row: any) => (isEqual(oldRow, row) ? updatedRow : row))

    case 'DFUSE_ERROR':
      // console.log('DFUSE_ERROR')
      return state

    default:
      throw new Error(`Invalid action: ${action.type}`)
  }
}

export default function useDfuseTableStream<State>({ code, scope, table, lower_bound, upper_bound }: GetTableRowsMessageData) {
  const client = useDfuseClient()
  const [state, dispatch] = useReducer(dfuseTableReducer, null)
  const stream = useRef<Stream>()

  const subscribe = useCallback(async () => {
    stream.current = await client.streamTableRows(
      { code, scope, table, lower_bound, upper_bound },
      (message) => {
        switch (message.type) {
          case 'listening':
            dispatch({ type: 'DFUSE_LISTENING' })
            break

          case 'table_snapshot':
            dispatch({ type: 'DFUSE_SNAPSHOT', payload: message })
            break

          case 'table_delta':
            // TODO: handle microforks https://docs.dfuse.io/#websocket-never-miss-a-beat
            if (message.data.step === 'undo') break
            switch (message.data.dbop.op) {
              case 'ins':
                dispatch({ type: 'DFUSE_INSERT', payload: message })
                break
              case 'rem':
                dispatch({ type: 'DFUSE_REMOVE', payload: message })
                break
              case 'upd':
                dispatch({ type: 'DFUSE_UPDATE', payload: message })
                break
              default:
                break
            }
            break

          case 'error':
            dispatch({ type: 'DFUSE_ERROR', payload: message })
            break

          default:
            throw new Error(`Unsupported type: ${message.type}`)
        }
      },
      { fetch: true },
    )
  }, [client, code, scope, table, lower_bound, upper_bound])

  const unsubscribe = useCallback(() => {
    return stream.current && stream.current.close()
  }, [])

  return {
    state,
    subscribe,
    unsubscribe,
  }
}
