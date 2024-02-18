import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { ItemPostType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useConnectionErrorToast } from "@/components/toasts/connection-error";
import { useRequestErrorToast } from "@/components/toasts/request-error";
import { useCreateItemSucessToast } from "@/components/toasts/create-item-sucess";

interface CreateItemProps {
  data: ItemPostType
}

export function useCreateItem() {
  const { connectionErrorToast } = useConnectionErrorToast()
  const { requestErrorToast } = useRequestErrorToast()
  const { createItemSucessToast } = useCreateItemSucessToast()

  const queryClient = useQueryClient()

  const createItem = useMutation({
    mutationKey: ['item-check-update'],
    mutationFn: ({ data }: CreateItemProps) => useRequest({
      url: `/item`,
      method: 'post',
      data,
    }),
    onError: (error: AxiosError) => {
      if(error.code === 'ERR_NETWORK') {
        connectionErrorToast()
        return 
      }
      
      requestErrorToast()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['items-data']
      })

      createItemSucessToast()
    }
  })

  return { createItem }
}
