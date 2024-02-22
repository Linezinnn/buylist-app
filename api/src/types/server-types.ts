import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export type ServerInstance = FastifyInstance

type OriginalServerRequestType = FastifyRequest
type OriginalServerResponseType = FastifyReply

export type TESTServerRequest = {
   [K in keyof OriginalServerRequestType]: OriginalServerRequestType[K] 
}

export type ServerRequest = OriginalServerRequestType | TESTServerRequest

export type TESTServerResponse = {
   [K in keyof OriginalServerResponseType]: OriginalServerResponseType[K] 
}

export type ServerResponse = OriginalServerResponseType | TESTServerResponse