import { useContext } from 'react'
import { TransitStateContext } from './transit-context'

export default function useTransitState() {
  const context = useContext(TransitStateContext)

  if (context === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransitState().')
  }

  return context
}
