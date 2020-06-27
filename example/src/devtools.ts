import VConsole from 'vconsole'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-new
  new VConsole()
}
