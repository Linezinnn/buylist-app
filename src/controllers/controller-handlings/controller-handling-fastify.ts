import { statusCode } from "../../constants/http-status-codes"
import { UpError } from "../../errors/up-error"
import { IControllerHandling } from "./interfaces/controller-handling-interface"

export async function controllerHandlingFastify({ callback, response }: IControllerHandling) {
   try {
      await callback()
   } catch(error: unknown) {
      if(error instanceof UpError) {
         response
         .status(error.statusCode || statusCode.BAD_REQUEST)
         .send(error)

         return
      }

      response
      .status(statusCode.INTERNAL_ERROR)
      .send(`Unxpected error: the error shoulds be instance of UpError. Received error data: ${error}`)
   }
}