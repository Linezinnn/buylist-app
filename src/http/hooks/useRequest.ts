import { apiInstance } from "@/lib/axios"

interface FecthProps {
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  data?: any,
  url: string,
  params?: {
    id?: string
  }
}

export async function useRequest<ResponseType>({ method, url, data, params }: FecthProps) {
  const { data: responseData } = await apiInstance<ResponseType>({
    method,
    url,
    data,
    params,
  })

  return responseData
}