import { ApolloClient, InMemoryCache, useApolloClient } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import Taskcomponent from '../components/Task'
import { CreateTask, ListTasks } from '../graphql'
import { Task } from '../models'

export default function Home({ data }: any) {
  const client = useApolloClient();
  const router = useRouter();
  const addTask = useCallback(() => {
    client.mutate({
      mutation: CreateTask,
      variables: {
        task: {
          title: 'Nova Tarefa',
          description: '',
          completed: false
        }
      }
    }).finally(() => {
      router.reload()
    })
  }, [client, router]);
  return (
    <>
      <ul className='list-group'>
        {
          data.map((e: Task, index: number) => (<>
            <Taskcomponent ID={e.ID} completed={e.completed} creation={e.creation} description={e.description} title={e.title} key={index} />
          </>))
        }
      </ul>
      <button className="btn btn-outline-secondary" onClick={addTask}><i className="bi bi-plus-lg"></i></button>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.GRAPHQL_ENDPOINT,
    ssrMode: true
  })
  const { data: { listTasks } } = await client.query({
    query: ListTasks,
  })
  return {
    props: {
      data: listTasks
    }
  }
}