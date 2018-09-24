export type colapseModalStatu = 'none' | 'success' | 'loading' | 'error'

export interface modalTabs {
  id: modalSections
  label: string
}
export type modalSections = 'home' | 'workspace' | 'TODO'

export interface accountInfo {
  version: string
  isProduction: boolean
  userEmail: string
  userRol: string
  accountCode: string
  register: string
}
