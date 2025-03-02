export interface User {
    id?: number | string;
    token?: string;
    name?: string;
    fitst_name?: string;
    last_name?: string;
    email: string;
    password?: number | string;
    role?: string;
    permissions?: string[];
}