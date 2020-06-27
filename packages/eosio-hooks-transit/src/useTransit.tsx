import { TransitContext } from './TransitContext'
import React from 'react'

export const useTransit = () => {
  const context = React.useContext(TransitContext)

  if (context === undefined) {
    throw new Error('You must wrap your application with <TransitProvider /> in order to useTransit().')
  }

  return context
}

export default useTransit
