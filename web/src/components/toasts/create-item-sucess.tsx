import { useToast } from "../ui/use-toast"

export function useCreateSucessToast() {
  const { toast } = useToast()

  const createSucessToast = () => toast({
    title: 'Sucesso',
    description: 'A criação foi concluída com êxito, e já se encontra disponível!',
    variant: 'sucess',
  })

  return { createSucessToast }
}