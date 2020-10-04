import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import TaskCard from "../components/TaskCard";

import api from "../services/api";
import { TaskType } from "../types";

function EditScreen() {
    let { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [loading, setLoading] = useState<boolean>(true);
    const [editTask, setEditTask] = useState<TaskType>();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        api.get(`/tasks/${id}`)
            .then((response) => {
                const task = response.data as TaskType;

                setEditTask(task);

                setTitle(task.title);
                setDescription(task?.description || "");
                setLoading(false);
            })
            .catch((error) => {
                history.push("/");

                if (error.response) {
                    const status = error.response.status;
                    const errorData = error.response.data;

                    toast.error(`${status} - ${errorData.error}`);
                } else {
                    toast.error(`Houve um problema ao tentar acessar a tarefa... Por favor, verifique as informações.`);
                }
            });
    }, [id, history]);

    useEffect(() => {
        setEditTask((oldValue) => {
            const tempTask = {
                _id: oldValue?._id,
                title: title,
                description: description,
                createdAt: oldValue?.createdAt,
                updatedAt: oldValue?.updatedAt,
            } as TaskType;
            return tempTask;
        });
    }, [title, description]);

    function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);

        const updatedTask = {
            title,
            description,
        };

        api.patch(`/tasks/${editTask?._id}/edit`, updatedTask)
            .then(() => {
                toast.success("As alterações foram salvas com sucesso!");
            })
            .catch((error) => {
                if (error.response) {
                    const status = error.response.status;
                    const errorData = error.response.data;

                    toast.error(`${status} - ${errorData.error}`);
                } else {
                    toast.error(`Houve um problema ao tentar salvar as aterações... Por favor, tente novamente.`);
                }
            })
            .then(() => {
                setLoading(false);
            });
    }

    function handleDelete(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);

        api.delete(`/tasks/${editTask?._id}/delete`)
            .then(() => {
                toast.success("Uma tarefa foi removida com sucesso!");
                history.push("/");
            })
            .catch((error) => {
                setLoading(false);

                if (error.response) {
                    const status = error.response.status;
                    const errorData = error.response.data;

                    toast.error(`${status} - ${errorData.error}`);
                } else {
                    toast.error(`Houve um problema ao tentar remover a tarefa... Por favor, tente novamente.`);
                }
            });
    }

    function handleCancel(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        toast.info("Nenhuma das alterações realizadas foram salvas!");
        history.push("/");
    }

    return (
        <div className="screen-route edit-screen">
            {loading && (
                <div className="flex-center">
                    <ReactLoading type="bars" color="#bbb" />
                </div>
            )}
            {!loading && !editTask && (
                <div className="flex-center">
                    <ReactLoading type="bars" color="#bbb" />
                </div>
            )}
            {!loading && editTask && <TaskCard taskData={editTask} />}
            {!loading && editTask && (
                <form className="col">
                    <label className="col">
                        Título
                        <input className="input-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label className="col">
                        Descrição
                        <input className="input-text" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <input className="create-task-button" type="submit" value="Salvar" onClick={handleSubmit} />
                    <input className="create-task-button" type="submit" value="Cancelar" onClick={handleCancel} />
                    <input className="delete-task-button" type="submit" value="Excluir" onClick={handleDelete} />
                </form>
            )}
        </div>
    );
}

export default EditScreen;
