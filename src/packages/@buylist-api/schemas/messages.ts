export const messages = {
  MAX_LENGTH: (length: number) => ({
     EN: `The maximium length is ${length}`,
     PT: `O tamanho máximo é ${length}`,
  }),
  MIN_LENGTH: (length: number) => ({
     EN: `The minimum length is ${length}`,
     PT: `O tamanho mínimo é ${length}`,
  }),
  REQUIRED: {
     EN: 'This field is required',
     PT: 'Este campo é obrigatório',
  },
  UUID: {
     EN: 'This field must be a UUID',
     PT: 'Este campo deve ser um UUID',
  },
  REGEX: (reason: string) => {
      return {
         EN: `This regex is invalid: ${reason}`,
         PT: `Este regex é invalido: ${reason}`,
      }
  },
  NAME_ALREADY_EXISTS: {
      EN: 'This name already exists',
      PT: 'Este nome já existe',
  }
}