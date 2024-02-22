import { IError } from "./interfaces/error-interface"

interface UpErrorProps {
   statusCode?: number,
   error?: any,
   message: string,
}

export class UpError implements IError {
   private $statusCode: UpErrorProps['statusCode']
   private $error: UpErrorProps['error']
   private $message: UpErrorProps['message']

   constructor({
      message,
      error,
      statusCode
   }: UpErrorProps) {
      this.$statusCode = statusCode
      this.$error = error
      this.$message = message
   }

   get statusCode() {
      return this.$statusCode
   }

   get error() {
      return this.$error
   }

   get message() {
      return this.$message
   }
}