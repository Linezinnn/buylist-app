import { apiInstance } from "@/lib/axios";

export async function getAmountCategories() {
  return await apiInstance.get('/all-amount-categories')
}
