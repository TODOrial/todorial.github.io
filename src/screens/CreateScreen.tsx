import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import api from "../services/api";

function CreateScreen() {
    const [loading, setLoading] = useState<boolean>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const history = useHistory();

    function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        setLoading(true);

        api.post("/tasks/create", {
            title,
            description,
        })
            .then(() => {
                toast.success("Tarefa criada com sucesso!");
                history.push("/");
            })
            .catch((error) => {
                setLoading(false);

                if (error.response) {
                    const status = error.response.status;
                    const errorData = error.response.data;

                    toast.error(`${status} - ${errorData.error}`);
                } else {
                    toast.error(`Houve um problema ao tentar criar a tarefa... Por favor, tente novamente.`);
                }
            });
    }

    function handleCancel(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        toast.info("Nenhuma das alterações realizadas foram salvas!");
        history.push("/");
    }

    return (
        <div className="screen-route create-screen">
            {loading && (
                <div className="flex-center">
                    <ReactLoading type="bars" color="#bbb" />
                </div>
            )}
            {!loading && (
                <form className="col">
                    <label className="col">
                        Título
                        <input className="input-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label className="col">
                        Descrição
                        <input className="input-text" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <input className="create-task-button" type="submit" value="Criar" onClick={handleSubmit} />
                    <input className="create-task-button" type="submit" value="Cancelar" onClick={handleCancel} />
                </form>
            )}
        </div>
    );
}

export default CreateScreen;
