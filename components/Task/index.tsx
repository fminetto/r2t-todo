import { InMemoryCache, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useCallback, useState } from "react";
import { CreateTask, UpdateTask } from "../../graphql";

import { Task } from "../../models";

export default function Taskcomponent(task?: Task) {
    const client = useApolloClient()
    const router = useRouter()
    const createTask = useCallback((task: Task) => {
        client.mutate({
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

    const updateTask = useCallback((task: Task) => {
        debugger
        client.mutate({
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

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const title = (elements.namedItem('title') as HTMLInputElement).value
        const description = (elements.namedItem('description') as HTMLInputElement).value
        const completed = (elements.namedItem('completed') as HTMLInputElement).checked
        debugger
        if (!!task?.ID) {
            updateTask(new Task(
                task.ID,
                title,
                description,
                "",
                completed
            ))
        } else {
            createTask(new Task(
                "",
                title,
                description,
                "",
                completed
            ))
            router.push('/')
        }
        return false;
    }, [createTask, router, task?.ID, updateTask])


    return <form onSubmit={onSubmit} className="card">
        <input className="card-title" type='text' name="title" defaultValue={task?.title || "Nova Tarefa"} />
        <textarea className="card-text" name="description" defaultValue={task?.description || "Descrição"} ></textarea>
        <div className="card-body">
            <input type="checkbox" name="completed" defaultChecked={task?.completed} id="completed" />
            <label htmlFor="completed">Completar tarefa</label>
        </div>
        <div className="btn-group" role="group">
            <button className="btn btn-outline-danger">Apagar</button>
            <input type='submit' className="btn btn-outline-primary" value="Salvar" />
        </div>
    </form>
}