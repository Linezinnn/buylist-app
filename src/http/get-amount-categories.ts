import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { AmountCategoryResponseType } from "@/types/amount-category-types";

import { useRequest } from "./hooks/useRequest";
import { useConnectionErrorToast } from "@/components/toasts/connection-error";
import { useRequestErrorToast } from "@/components/toasts/request-error";

export function useGetAmountCategories() {
  const { connectionErrorToast } = useConnectionErrorToast()
  const { requestErrorToast } = useRequestErrorToast()

  const response = useQuery({
    queryKey: ['amount-categories-data'],
    queryFn: () => useRequest<AmountCategoryResponseType[]>({
      url: '/all-amount-categories',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
    onError: (error: AxiosError) => {
      if(error.code === 'ERR_NETWORK') {
        connectionErrorToast()
        return 
      }
      
      requestErrorToast()
    },
  })

  return response
}

