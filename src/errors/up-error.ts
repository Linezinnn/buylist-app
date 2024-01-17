interface UpErrorProps {
   statusCode?: number,
   error?: object,
   message: string,
}

export class UpError {
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