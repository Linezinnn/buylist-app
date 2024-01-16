import { FastifyReply, FastifyRequest} from 'fastify'

export interface IAmountCategoryController {
   create(request: FastifyRequest, response: FastifyReply): Promise<void>
}