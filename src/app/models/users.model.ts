
export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: number;
    date: Date;
}


export interface ResponseUsers {
    status: number;
    result: User[];
}


export interface ResponseUser {
    status: number;
    result: User[];
}


export interface ResponseDelUser {
    status: number;
    result: string;
}


export interface ResponsePostUser {
    status: number;
    result: string;
}


export interface ResponsePutUser {
    status: number;
    result: string;
}
