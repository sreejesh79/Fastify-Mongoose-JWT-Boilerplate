export interface IUserPayloadDTO {
    fullname: string;
    email: string;
    mobile: string;
    password: string;
}

export interface IUserBodyPayloadDTO extends IUserPayloadDTO {
    role: string ;
}

export interface IUserQueryPayloadDTO extends IUserPayloadDTO {
    roles?: string [];
}
export interface IUserIDPayloadDTO {
    _id: string;
    mobile?: string;
    email?: string;
    password: string;
    fullname: string;
    roles: IRoleDTO[];
    refreshToken?: string;
}

export interface IRoleDTO {
    _id: string;
    name: string;
    machine_name: string;
}

export interface IRoleBodyPayloadDTO {
    name: string
}