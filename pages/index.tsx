import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'

import Taskcomponent from '../components/Task'
import { Task } from '../models'

export default function Home({ data }: any) {
  return (
    <>
      <section className='home'>
        {
          data.map((e: Task, index:number) => (<>
            <Taskcomponent ID={e.ID} completed={e.completed} creation={e.creation} description={e.description} title={e.title} key={index}/>
          </>))
        }
      </section>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.GRAPHQL_ENDPOINT
  })
  const { data: { listTasks } } = await client.query({
    query: gql`query listTasks{
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
      data: listTasks
    }
  }
}