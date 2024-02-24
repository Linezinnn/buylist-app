import { useMutation, useQueryClient } from "react-query";

import { ItemPostType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { mutationKeys, queryKeys } from "./request-keys";

import { useCreateItemSucessToast } from "@/components/toasts";

interface CreateItemProps {
  data: ItemPostType
}

export function useCreateItem() {
  const { createItemSucessToast } = useCreateItemSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const createItem = useMutation({
    mutationKey: [mutationKeys.createItem],
    mutationFn: ({ data }: CreateItemProps) => useRequest({
      url: `/item`,
      method: 'post',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.itemsData]
      })

      createItemSucessToast()
    }
  })

  return { createItem }
}
