export interface InputField {
  id: string
  type: string
  label: string
  placeholder?: string
  options?: string[]
}

export interface NewUser {
  'first-name': string
  'last-name': string
  'email': string
  'cac': string
  'business-type'?: string
  'password': string
}