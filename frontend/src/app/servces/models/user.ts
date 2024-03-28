import { Role } from "./role";
export interface User {
    id: number;
    name: string;
    password: string;
    UserRole: Role;
}

export interface UserOut {
    id: number;
    name: string;
    password: string;
    UserRole: number;
}
