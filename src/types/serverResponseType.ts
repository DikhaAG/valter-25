export interface ServerResponseType<T> {
        success: boolean;
        message?: string;
        data?: T;
        error? : unknown
}
