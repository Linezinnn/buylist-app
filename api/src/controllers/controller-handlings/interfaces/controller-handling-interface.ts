import { ServerResponse } from "../../../types/server-types";

export interface IControllerHandling {
   response: ServerResponse
   callback: () => any,
}