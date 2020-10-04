import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

import { TaskType } from "../../types";

function TaskCard({ taskData }: { taskData: TaskType }) {
    const { _id, title, description, createdAt } = taskData;

    DateTime.local().setLocale("pt-br");

    const updatedAtDate = DateTime.fromISO(createdAt);

    return (
        <Link className="task-card" to={`/${_id}/edit`}>
            {/* <p>{_id}</p> */}
            <h4 className="task-title">{title}</h4>
            <div className="row space-between word-break-all">
                <p className="task-description">{description}</p>
                <p className="task-updated-at-date">{updatedAtDate.toFormat("ff")}</p>
            </div>
            {/* <p>{updatedAt}</p> */}
        </Link>
    );
}

export default TaskCard;
