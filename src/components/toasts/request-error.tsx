import { useToast } from "../ui/use-toast"

export function useRequestErrorToast() {
  const { toast } = useToast()

  const requestErrorToast = () => toast({
    title: 'Erro de Requisição',
    description: 'Não foi possível fazer a requisição ao servidor.',
    variant: 'error',
  })

  return { requestErrorToast }
}