import '../styles/globals.css'

import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.GRAPHQL_ENDPOINT
})

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
  
}
