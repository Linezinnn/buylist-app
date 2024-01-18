import { FastifyRequest, FastifyReply } from "fastify";
import { IAmountCategoryController } from "./interfaces/controllers-interfaces";
import { ICreateAmountCategoryUseCase } from "../usecases/interfaces/usecases-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { UpError } from "../errors/up-error";
import { statusCode } from "../constants/http-status-codes";

export class AmountCategoryController implements IAmountCategoryController {
   constructor(
      private createAmountCategoryUseCase: ICreateAmountCategoryUseCase
   ) {}

   async create(request: FastifyRequest, response: FastifyReply): Promise<void> {
      try {
         const data = request.body as AmountCategoryDTOType

         const result: AmountCategoryType = await this.createAmountCategoryUseCase.execute(data) 

         response
         .status(statusCode.CREATED)
         .header('location', `/amount-category/${result.id}`)
         .send(result)
      } catch(error: unknown) {
         if(error instanceof UpError) {
            response
            .status(error.statusCode || statusCode.OK)
            .send(error)

            return 
         }

         response
         .status(statusCode.INTERNAL_ERROR)
         .send(`Unxpected error: the error shoulds be instance of UpError. Received error data: ${error}`)
      }
   }
}