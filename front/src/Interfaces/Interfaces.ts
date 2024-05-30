export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginDataError {
    email: string;
    password?: string;
}

export interface ILogedUser {
    token: string;
    user: IUser;
}

export interface IUser {
    name: string;
    lastname: string;
    email: string;
    password?: string;
    role: string;
}

export interface IAdmin extends IUser {
    phone: number;
    address: string;
    cuit: string;
    rpa: string;
    sat: string;
}

export interface IRegisterConsortium {
    name: string;
    adress: string;
    email: string;
    phone_number: string;
    cuit: string;
    password: string;
    sat: string;
    rpa: string;
}

export interface IRegisterConsortiumError {
    name?: string;
    adress?: string;
    email?: string;
    phone_number?: string;
    cuit?: string;
    password?: string;
    sat?: string;
    rpa: string;
}
