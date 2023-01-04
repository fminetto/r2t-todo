import { gql } from "@apollo/client";

const mutation = gql`mutation deleteTasks(
    $taskId:ID!
){
    deleteTask(
        taskId:$taskId
    )
}`

export default mutation