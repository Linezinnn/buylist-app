import { AxiosError } from "axios"

import { useRequestErrorToast } from "@/components/toasts"

export function useOnError() {
  const { requestErrorToast } = useRequestErrorToast()
  
  const displayErrorToasts = (error: AxiosError) => requestErrorToast(error.code)

  return { displayErrorToasts }
}