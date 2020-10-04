import React, { useEffect, useState } from "react";

import api from "../services/api";
import TaskType from "../types/TaskType";

import TaskCard from "../components/TaskCard";

function HomeScreen() {
    const [tasks, setTasks] = useState<TaskType[]>();

    useEffect(() => {
        api.get("/tasks").then((response) => {
            const tasks = response?.data?.results as TaskType[];
            setTasks(tasks);
        });
    }, []);

    return (
        <div className="screen-route home-screen">
            {tasks && (
                <ul className="todo-list">
                    {tasks.map((task, index) => (
                        <TaskCard taskData={task} key={index} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomeScreen;
