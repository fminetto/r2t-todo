import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { v4 as uuid } from 'uuid'

import { Task } from '../../models'

let tasks: Task[] = []

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
        updateTask(taskId:ID!, task:TaskInput!):Boolean
        deleteTask(taskId:ID!):Boolean
    }
`

const resolvers = {
    Query: {
        listTasks: async () => {
            return tasks
        },
        getTask: async (_: any, args: any) => {
            const { taskId } = args;
            return tasks.find(({ ID }) => ID === taskId)
        }
    },
    Mutation: {
        createTask: async (_: any, args: any) => {
            const { task } = args;
            const id = uuid();
            tasks.push(
                new Task(id, task.title, task.description, new Date().toISOString(), task.completed)
            );
            return id;
        },
        updateTask: async (_: any, args: any) => {
            const { taskId, task } = args;
            const index = tasks.findIndex(({ ID }) => ID === taskId);
            if (index === -1) {
                return false
            }
            tasks[index] = new Task(
                taskId, task.title, task.description, tasks[index].creation, task.completed
            );
            return true;
        },
        deleteTask: async (_: any, args: any) => {
            const { taskId } = args;
            tasks = tasks.filter(({ ID }) => ID !== taskId)
            return true
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

export default startServerAndCreateNextHandler(server)