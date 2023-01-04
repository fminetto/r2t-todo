import { gql } from "@apollo/client";

const mutation = gql`mutation updateTask(
    $task:TaskInput!
    $taskId: ID!    
){
    updateTask(
        taskId: $taskId
        task:$task
    )
}`

export default mutation