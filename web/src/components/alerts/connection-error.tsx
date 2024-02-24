import { AlertTriangle } from "lucide-react";
import { useQueryClient } from "react-query";

import { useVerifyApiStatus } from "@/http/verify-api-status";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function ConnectionErrorAlert() {
  const queryClient = useQueryClient()
  const { isError } = useVerifyApiStatus()

  const handleInvalidateAllQueries = () => queryClient.invalidateQueries()

  return (
    <>{isError && (
      <Alert variant='error' className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle />
          <div>
            <AlertTitle>
              Falha na Comunicação com a API
            </AlertTitle>
            <AlertDescription>
              Desculpe-nos! Parece que o servidor está temporariamente indisponível, 
              ou não foi possível conectar-se à ela.
            </AlertDescription>
          </div>
        </div>
        <button
          className="text-sm border border-red-500/50 p-2 rounded-md"
          onClick={handleInvalidateAllQueries}
        >
          Tentar novamente
        </button>
      </Alert>
    )}</>
  )
}