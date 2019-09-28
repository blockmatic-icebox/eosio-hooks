import { useContext } from 'react'
import useTransitState from './use-transit-state'
import { TransitContext } from './transit-context'

export default function useTransit() {
  const state = useTransitState()
  const context = useContext(TransitContext)

  if (context === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransit().')
  }

  return {
    state,
    ...context,
  }
}
