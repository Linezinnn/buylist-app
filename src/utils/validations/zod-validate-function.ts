import { ZodType } from "zod"
import { UpError } from "../../errors/up-error"

interface validateFunctionProps {
   schema: ZodType,
   data: any
}

export function validateFunction({schema, data}: validateFunctionProps) {
   try {
      const validatedData = schema.parse(data) 
      
      return validatedData
   } catch (error: any) {
      throw new UpError({
         statusCode: 400,
         message: error.issues[0].message,
         error,
      })
   }
}