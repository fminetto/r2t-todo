import { Task } from "../../models";

export default function Taskcomponent({ ID, completed, creation, description, title }: Task) {
    return <div className="card">
        <div className="card-body">
            <div className="card-header">
                <h5 className="card-title">
                    {title}
                </h5>
            </div>
            <p className="card-text">{description}</p>
            <div className="btn-group" role="group">
            {
                completed?
                <button className="btn btn-outline-warning">Voltar Tarefa</button>:
                <button className="btn btn-outline-success">Concluir Tarefa</button>
            }
                <button className="btn btn-outline-danger">Apagar</button>
            </div>
        </div>
    </div>
}