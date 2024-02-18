export type DefaultErrorType = {
  get statusCode(): number | undefined
  get error(): any | undefined
  get message(): string
}
