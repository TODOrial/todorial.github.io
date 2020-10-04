import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../services/api";

function CreateScreen() {
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();

    const history = useHistory();

    function handleSubmit(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();

        api.post("/tasks/create", {
            title,
            description,
        }).then(() => {
            history.push("/");
        });
    }

    return (
        <div className="screen-route create-screen">
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
            </form>
        </div>
    );
}

export default CreateScreen;
