import { createContext, useContext, useState } from 'react'

export type Breadcrumptype = {
  path: string,
  label: string
}

export type BreadcrumbContextType = {
  breadcrumbs: Breadcrumptype[],
  updateBreadcrumbs: (newBreadcrumbs: Breadcrumptype[]) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null)

export const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {

  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumptype[]>([])

  const updateBreadcrumbs = (newBreadcrumbs: Breadcrumptype[]) => {
    setBreadcrumbs(newBreadcrumbs)
  }

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, updateBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumbs = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext)
  if (context === null) throw Error('useBreadcrumbs must be used within a BreadcrumbProvider')

  return context
}