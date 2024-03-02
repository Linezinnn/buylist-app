import { useMutation, useQueryClient } from "react-query";

import { AmountCategoryPostType } from "@/types/amount-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { mutationKeys, queryKeys } from "./request-keys";

import { useCreateSucessToast } from "@/components/toasts";

interface CreateAmountCategoryProps {
  data: AmountCategoryPostType
}

export function useCreateAmountCategory() {
  const { createSucessToast } = useCreateSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const createAmountCategory = useMutation({
    mutationKey: [mutationKeys.createAmountCategory],
    mutationFn: ({ data }: CreateAmountCategoryProps) => useRequest({
      url: `/amount-category`,
      method: 'post',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.amountCategoriesData]
      })

      createSucessToast()
    }
  })

  return { createAmountCategory }
}
