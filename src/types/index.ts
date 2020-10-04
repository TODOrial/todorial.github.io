export type NavigationType = {
    offset: number;
    limit: number;
    last: number;
};

export type PaginatedInfoType = {
    offset: number;
    limit: number;
    last: number;
    results: any[] | TaskType[];
};

export type TaskType = {
    _id: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
};
