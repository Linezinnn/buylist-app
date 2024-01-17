import { FastifyRequest, FastifyReply } from "fastify";
import { IAmountCategoryController } from "./interfaces/controllers-interfaces";
import { ICreateAmountCategoryUseCase } from "../usecases/interfaces/usecases-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";
import { UpError } from "../errors/up-error";

export class AmountCategoryController implements IAmountCategoryController {
   constructor(
      private createAmountCategoryUseCase: ICreateAmountCategoryUseCase
   ) {}

   async create(request: FastifyRequest, response: FastifyReply): Promise<void> {
      try {
         const data = request.body as AmountCategoryDTOType

         const result: AmountCategoryType = await this.createAmountCategoryUseCase.execute(data) 

         response
         .status(201)
         .header('location', `/amount-category/${result.id}`)
         .send(result)
      } catch(error: any) {
         response
         .status(error.statusCode || 200)
         .send(error)
      }
   }
}