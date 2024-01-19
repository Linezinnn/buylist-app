export interface IDatabaseClient {
   connect(): Promise<void>
   isConnected: boolean
}