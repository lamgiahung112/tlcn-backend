export type Sortable<T extends string> = {
    [key in T]?: 'desc' | 'asc' | null;
};
