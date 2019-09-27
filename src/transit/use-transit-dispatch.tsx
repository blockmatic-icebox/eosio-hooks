import { useContext } from 'react'
import { TransitDispatchContext } from './transit-context'

export default function useTransitDispatch() {
  const dispatch = useContext(TransitDispatchContext)

  if (dispatch === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitDispatch().')
  }

  return dispatch
}
