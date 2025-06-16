export interface IEmailOtpPayloadDTO {
    email: string;
    fullname: string;
}

export interface IEmailOtpDTO extends IEmailOtpPayloadDTO {
    otp: string;
    otpExpiry: number;
    otpToken : string;
}
export interface IAccessTokenPayloadDTO {
    uid: string;
    user_id?: string;
}

export interface IEmailDTO {
    email: string;
}

export interface IOtpBodyDTO {
    otp: string;
}

export interface IUserDTO {
    email: string;
    fullname: string;
}

export interface ILoginPayloadDTO {
    email: string;
    password: string;
}

