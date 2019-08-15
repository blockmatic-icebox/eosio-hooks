export interface DfuseConfig {
  apiKey: string
  network: string
}

export interface DfuseReducerActionType {
  type: 'DFUSE_LISTENING' | 'DFUSE_SNAPSHOT' | 'DFUSE_INSERT' | 'DFUSE_REMOVE' | 'DFUSE_UPDATE' | 'DFUSE_ERROR',
  payload?: any
}
