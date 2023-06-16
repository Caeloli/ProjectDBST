import { Roles } from "./roles";

export interface UserInfo{
    id: number;
    nombre: string;
    email: string;
    tipo: Roles;
}