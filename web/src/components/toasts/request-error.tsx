import { useToast } from "../ui/use-toast"

export function useRequestErrorToast() {
  const { toast } = useToast()

  const requestErrorToast = (code: string = 'UNEXPECTED') => toast({
    title: `Erro de Requisição (${code})`,
    description: 'Não foi possível fazer a requisição ao servidor.',
    variant: 'error',
  })

  return { requestErrorToast }
}