import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { ItemCategoryResponseType } from "@/types/item-category-types";

import { useRequest } from "./hooks/useRequest";
import { useConnectionErrorToast } from "@/components/toasts/connection-error";
import { useRequestErrorToast } from "@/components/toasts/request-error";

export function useGetItemCategories() {
  const { connectionErrorToast } = useConnectionErrorToast()
  const { requestErrorToast } = useRequestErrorToast()

  const response = useQuery({
    queryKey: ['item-categories-data'],
    queryFn: () => useRequest<ItemCategoryResponseType[]>({
      url: '/all-item-categories',
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

