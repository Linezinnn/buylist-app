import { useToast } from "../ui/use-toast"

export function useConnectionErrorToast() {
  const { toast } = useToast()

  const connectionErrorToast = () => toast({
    title: 'Erro de Conexão',
    description: 'Houve um erro ao tentar se conectar com o servidor.',
    variant: 'error',
  })

  return { connectionErrorToast }
}