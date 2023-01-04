import { gql } from "@apollo/client";

const mutation = gql`
mutation createTask(
    $task:TaskInput!
){
    createTask(
        task:$task
    )
}`
export default mutation