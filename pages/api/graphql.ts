import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import { Task } from '../../models'

const tasks: Task[] = []

const typeDefs = `
    input TaskInput{
        title: String!
        description: String!
        completed: Boolean!
    }

    type Task{
        ID: ID!
        title: String
        description: String
        creation: String
        completed: Boolean
    }

    type Query{
        listTasks: [Task]
        getTask(taskId:ID!): Task!
    }

    type Mutation{
        createTask(task:TaskInput!):ID!
        updateTask(taskId:ID!):Boolean
        deleteTask(taskId:ID!):Boolean
    }
`

const resolvers = {
    Query: {
        listTasks: async () => {

        },
        getTask: async () => {

        }
    },
    Mutation: {
        createTask: async (_: any, args: any) => {
            const { task } = args;
            tasks.push(
                new Task(uuid, task.title, task.description, new Date().toISOString(), task.completed)
            )
        }
    },
    updateTask: async () => { },
    deleteTask: async () => { }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

export default startServerAndCreateNextHandler(server)