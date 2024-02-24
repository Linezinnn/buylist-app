import { useQuery } from "react-query";

import { AmountCategoryResponseType } from "@/types/amount-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { queryKeys } from "./request-keys";

export function useGetAmountCategories() {
  const { displayErrorToasts } = useOnError()

  const response = useQuery({
    queryKey: [queryKeys.amountCategoriesData],
    queryFn: () => useRequest<AmountCategoryResponseType[]>({
      url: '/all-amount-categories',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
    onError: displayErrorToasts,
  })

  return response
}

