import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useCallback } from "react";

import { CreateTask, DeleteTask, UpdateTask } from "../../graphql";
import { Task } from "../../models";

import '../../styles/TaskItem.module.css'

export default function Taskcomponent(task?: Task) {
    const client = useApolloClient()
    const router = useRouter()
    const createTask = useCallback(async (task: Task) => {
        await client.mutate({
            mutation: CreateTask,
            variables: {
                task: {
                    title: task.title,
                    description: task.description,
                    completed: task.completed
                }
            }
        })
    }, [client]);

    const updateTask = useCallback(async (task: Task) => {
        debugger
        await client.mutate({
            mutation: UpdateTask,
            variables: {
                taskId: task.ID,
                task: {
                    title: task.title,
                    description: task.description,
                    completed: task.completed
                }
            }
        })
    }, [client]);

    const deleteTask = useCallback(async () => {
        debugger
        await client.mutate({
            mutation: DeleteTask,
            variables: {
                taskId: task?.ID
            }
        })
    }, [client, task?.ID]);

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const title = (elements.namedItem('title') as HTMLInputElement).value
        const completed = (elements.namedItem('completed') as HTMLInputElement).checked
        if (!!task?.ID) {
            updateTask(new Task(
                task.ID,
                title,
                "",
                "",
                completed
            )).then(() => {
                router.reload()
            })
        } else {
            createTask(new Task(
                "",
                title,
                "",
                "",
                completed
            )).then(() => {
                router.reload()
            })
        }
        return false;
    }, [createTask, router, task?.ID, updateTask])


    return <li className="list-group-item">
        <form onSubmit={onSubmit}>
            <input type="checkbox" name="completed" id={`completed${task?.ID}`} defaultChecked={task?.completed} />
            <input type='text' name='title' className="task-title" defaultValue={task?.title} />
            <div className="btn-group" role='group'>
                <button className="btn btn-outline-primary"><i className="bi bi-save"></i></button>
                {
                    !!task?.ID &&
                    <button className="btn btn-outline-danger" onClick={deleteTask}><i className="bi bi-trash2"></i></button>
                }
            </div>
        </form>
    </li>
}