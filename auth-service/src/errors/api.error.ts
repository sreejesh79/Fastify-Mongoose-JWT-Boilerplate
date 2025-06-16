export class ApiError extends Error {
    public code: string;
    constructor(public statusCode: number, message: string ) {
        super(message);
        this.name = 'API Error';
        this.statusCode = statusCode;
        this.code = this._getCode(statusCode);
        console.log(this.code);
    }

    private _getCode = (statusCode: number) => {
        let code: string = '';
        switch(statusCode) {
            case 200:
                code = OK_CODE;
            break;
            case 400:
                code = BADREQUEST_CODE;
            break;
            case 401:
                code = UNAUTHORIZED_CODE;
            break;
            case 403:
                code = FORBIDDEN_CODE;
            break;
            case 404:
                code = NOTFOUND_CODE;
            break;
            case 500:
                code = ERROR_CODE;
            break;
            default:
                code = 'STATUSCODE_NOT_FOUND';
        }
        return code;
    }
}

export const OK_CODE: string = 'OK_SUCCESS';
export const BADREQUEST_CODE: string = 'BAD_REQUEST';
export const UNAUTHORIZED_CODE: string = 'UNAUTHORIZED';
export const FORBIDDEN_CODE: string = 'FORBIDDEN_NOT_ALLOWED';
export const NOTFOUND_CODE: string = 'NOT_FOUND';
export const ERROR_CODE: string = 'INTERNAL_SERVER_ERROR';

