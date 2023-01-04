import { InMemoryCache, useApolloClient } from "@apollo/client";
import { FormEvent, FormEventHandler, useCallback, useState } from "react";

import { Task } from "../../models";

export default function Taskcomponent(task?: Task) {

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const title = (elements.namedItem('title') as HTMLInputElement).value
        const description = (elements.namedItem('description') as HTMLInputElement).value
        const completed = (elements.namedItem('completed') as HTMLInputElement).checked
        debugger
        return false;
    }, [])


    return <form onSubmit={onSubmit} className="card">
        <input className="card-title" type='text' name="title" defaultValue={task?.title || "Nova Tarefa"} />
        <textarea className="card-text" name="description" defaultValue={task?.description || "Descrição"} ></textarea>
        <div className="card-body">
            <input type="checkbox" name="completed" checked={task?.completed} id="completed" />
            <label htmlFor="completed">Completar tarefa</label>
        </div>
        <div className="btn-group" role="group">
            <button className="btn btn-outline-danger">Apagar</button>
            <input type='submit' className="btn btn-outline-primary" value="Salvar" />
        </div>
    </form>
}