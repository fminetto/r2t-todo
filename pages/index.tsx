import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'

import { Task } from '../models'

export default function Home() {
  return (
    <>

    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.GRAPHQL_ENDPOINT
  })
  const {data:{listTasks}} = await client.query({
    query:gql`query listTasks{
      listTasks{
          ID
          title
          completed
          description
          creation
      }
  }`,
  })
  return {
    props: {
      data:listTasks.map((element:any)=>new Task(element.ID, element.title, element.description, element.creation, element.completed))
    }
  }
}