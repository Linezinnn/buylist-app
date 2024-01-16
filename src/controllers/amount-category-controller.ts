import { FastifyRequest, FastifyReply } from "fastify";
import { IAmountCategoryController } from "./interfaces/controllers-interfaces";
import { ICreateAmountCategoryUseCase } from "../usecases/interfaces/usecases-interfaces";
import { AmountCategoryDTOType, AmountCategoryType } from "../types/amount-category-types";

export class AmountCategoryController implements IAmountCategoryController {
   constructor(
      private createAmountCategoryUseCase: ICreateAmountCategoryUseCase
   ) {}

   async create(request: FastifyRequest, response: FastifyReply): Promise<void> {
      try {
         const data = request.body as AmountCategoryDTOType

         const result: AmountCategoryType = await this.createAmountCategoryUseCase.execute(data) 

         response
         .send(result)
         .header('location', `/amount-category/${result.id}`)
         .status(201)
      } catch(error) {
         response
         .send(error)
         .status(400)
      }
   }
}