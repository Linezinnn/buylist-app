"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = require("@fastify/cors");
const routes_1 = require("./routes");
require("./database/prisma-client");
const prisma_client_1 = require("./database/prisma-client");
const server = (0, fastify_1.default)({ logger: true });
const port = 8080;
(0, prisma_client_1.connectDatabase)();
server.register(cors_1.fastifyCors, {
    origin: '*'
});
server.register(routes_1.Routes);
server.listen({
    port,
}, () => {
    console.log(`The server is running in url: http://localhost:${port}`);
});
