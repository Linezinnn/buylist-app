import { ZodError, ZodType } from "zod"
import { UpError } from "../../errors/up-error"

interface validateFunctionProps<T> {
   schema: ZodType<T>,
   data: any
}

export function validateFunction<T>({schema, data}: validateFunctionProps<T>) {
   try {
      const validatedData = schema.parse(data) 
      
      return validatedData
   } catch (error: unknown) {
      if(error instanceof ZodError){
         throw new UpError({
            statusCode: 400,
            message: error.issues[0].message,
            error,
         })
      }

      throw new UpError({
         statusCode: 500,
         message: 'Unxpected error: The validation error type is incompatible',
         error,
      })
   }
}