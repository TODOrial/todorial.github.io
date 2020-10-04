import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import TaskCard from "../components/TaskCard";

import api from "../services/api";
import TaskType from "../types/TaskType";

function EditScreen() {
    let { id } = useParams<{ id: string }>();
    const history = useHistory();

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
            })
            .catch((error) => {
                history.push("/");
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

        const updatedTask = {
            title,
            description,
        };

        api.patch(`/tasks/${editTask?._id}/edit`, updatedTask).then(() => {
            history.push("/");
        });
    }

    function handleDelete(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();

        api.delete(`/tasks/${editTask?._id}/delete`).then(() => {
            history.push("/");
        });
    }

    return (
        <div className="screen-route edit-screen">
            {editTask && <TaskCard taskData={editTask} />}
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
                <input className="delete-task-button" type="submit" value="Excluir" onClick={handleDelete} />
            </form>
        </div>
    );
}

export default EditScreen;
