export type colapseModalStatu = 'none' | 'success' | 'loading' | 'error'

export interface modalTabs {
  id: modalSections
  label: string
}
export type modalSections = 'home' | 'workspace' | 'account' | 'apps' | 'installedApps' | 'TODO'

export interface accountInfo {
  version: string
  isProduction: boolean
  userEmail: string
  userRol: string
  accountCode: string
  register: string
}

export interface appsMap {
  categories: string[]
  credentialType: string
  description: string
  id: string
  link: string
  name: string
  title: string
  vendor: string
  version: string
  __typename: string
  _activationDate: string
  _id: string
  _link: string
}
