export interface IError {
   get statusCode(): number | undefined
   get error(): any | undefined
   get message(): string
}