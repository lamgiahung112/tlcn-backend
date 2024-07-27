export type Sortable<T extends string> = {
    [key in T]: 'DESC' | 'ASC' | null;
};
