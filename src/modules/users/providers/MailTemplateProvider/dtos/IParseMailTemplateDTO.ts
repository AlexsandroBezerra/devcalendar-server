interface ITemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplateDTO {
  file: string
  variables: ITemplateVariables
}

export default IParseMailTemplateDTO
