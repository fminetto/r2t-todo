import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { useCallback, useState } from 'react'

import Taskcomponent from '../components/Task'
import { ListTasks } from '../graphql'
import { Task } from '../models'

export default function Home({ data }: any) {
  const [tasks, setTasks] = useState<Task[]>(data)
  const addTask = useCallback(() => {
    debugger
    const tmpTasks = Array.from(tasks);
    tmpTasks.push(new Task(
      "",
      "Nova Tarefa",
      "",
      "",
      false
    ))
    setTasks(tmpTasks)
  }, [tasks]);
  return (
    <>
      <ul className='list-group'>
        {
          tasks.map((e: Task, index: number) => (<>
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