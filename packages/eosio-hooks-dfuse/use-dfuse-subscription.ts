import { useMemo } from 'react'
import useDfuseClient from './use-dfuse-client'
import { useSubscription } from 'react-apollo-hooks'
import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DocumentNode } from 'graphql'

export default function useDfuseSubscription(query: DocumentNode) {
  const client = useDfuseClient()

  const subscriptionClient = useMemo(() => {
    return new SubscriptionClient(client.endpoints.graphqlStreamUrl, {
      lazy: true,
      connectionCallback: (error?: any) => {
        if (error) {
          console.log('Unable to correctly initialize connection', error)
        }
      },
      connectionParams: async () => {
        const { token } = await client.getTokenInfo()

        return { Authorization: `Bearer ${token}` }
      },
    })
  }, [client])

  const apolloClient = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new WebSocketLink(subscriptionClient),
    })
  }, [subscriptionClient])

  return useSubscription(query, { client: apolloClient })
}
