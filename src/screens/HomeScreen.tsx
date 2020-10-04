import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";

import api from "../services/api";

import TaskCard from "../components/TaskCard";
import { TaskType, NavigationType, PaginatedInfoType } from "../types";

function HomeScreen() {
    const [loading, setLoading] = useState<boolean>(true);
    const [tasks, setTasks] = useState<TaskType[]>();
    const [navigation, setNavigation] = useState<NavigationType>({ offset: 0, limit: 10, last: 0 });

    useEffect(() => {
        fetchTasks(navigation.offset, navigation.limit);
    }, [navigation.offset, navigation.limit]);

    function fetchTasks(offset: number, limit: number) {
        setLoading(true);
        return api.get(`/tasks?offset=${offset}&limit=${limit}`).then((response) => {
            const { offset, limit, last, results } = response.data as PaginatedInfoType;

            setLoading(false);
            setTasks(results);
            setNavigation({ offset, limit, last });
        });
    }

    function handlePageClick(data: any) {
        const selected = data.selected;
        const offset = Math.ceil(selected * navigation.limit);

        fetchTasks(offset, navigation.limit);
    }

    return (
        <div className="screen-route home-screen">
            {!loading && tasks && (
                <ul className="todo-list">
                    {tasks.map((task, index) => (
                        <TaskCard taskData={task} key={index} />
                    ))}
                </ul>
            )}

            {loading && (
                <div className="flex-center">
                    <ReactLoading type="bars" color="#bbb" />
                </div>
            )}

            <ReactPaginate
                pageCount={Math.max(1, Math.ceil(navigation.last / navigation.limit))}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                breakLabel={"..."}
                nextLabel={"Próximo"}
                previousLabel={"Voltar"}
                containerClassName={"pagination"}
                breakClassName={"break-me"}
                activeClassName={"active"}
                nextClassName={"button-link"}
                pageLinkClassName={"button-link"}
                previousClassName={"button-link"}
            />
        </div>
    );
}

export default HomeScreen;
