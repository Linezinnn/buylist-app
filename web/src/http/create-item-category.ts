import { useMutation, useQueryClient } from "react-query";

import { ItemCategoryPostType } from "@/types/item-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { mutationKeys, queryKeys } from "./request-keys";

import { useCreateSucessToast } from "@/components/toasts";

interface CreateItemCategoryProps {
  data: ItemCategoryPostType
}

export function useCreateItemCategory() {
  const { createSucessToast } = useCreateSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const createItemCategory = useMutation({
    mutationKey: [mutationKeys.createItemCategory],
    mutationFn: ({ data }: CreateItemCategoryProps) => useRequest({
      url: `/item-category`,
      method: 'post',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.itemCategoriesData]
      })

      createSucessToast()
    }
  })

  return { createItemCategory }
}
