import React, { useCallback, useEffect, useState } from "react";
import { useUrlSearchParams } from "use-url-search-params";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";

import api from "../services/api";

import TaskCard from "../components/TaskCard";
import { TaskType, NavigationType, PaginatedInfoType } from "../types";

function HomeScreen() {
    const [params, setParams] = useUrlSearchParams({ offset: 0, limit: 10 }, { offset: Number, limit: Number });

    const [loading, setLoading] = useState<boolean>(true);
    const [tasks, setTasks] = useState<TaskType[]>();
    const [navigation, setNavigation] = useState<NavigationType>({ offset: params.offset as number, limit: params.limit as number, last: 0 });

    const fetchTasks = useCallback((offset: number, limit: number) => {
        setLoading(true);
        return api.get(`/tasks?offset=${offset}&limit=${limit}`).then((response) => {
            const { offset, limit, last, results } = response.data as PaginatedInfoType;

            setLoading(false);
            setTasks(results);
            setNavigation({ offset, limit, last });
        });
    }, []);

    useEffect(() => {
        fetchTasks(navigation.offset, navigation.limit);
    }, [fetchTasks, navigation.offset, navigation.limit]);

    function handlePageClick(data: any) {
        const selected = data.selected;
        const offset = Math.ceil(selected * navigation.limit);

        fetchTasks(offset, navigation.limit);
        setParams({ offset, limit: navigation.limit });
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
                initialPage={Math.max(1, navigation.offset / navigation.limit)}
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
