import { gql } from "@apollo/client";

const query = gql`query listTasks{
    listTasks{
        ID
        title
        completed
        description
        creation
    }
}`

export default query