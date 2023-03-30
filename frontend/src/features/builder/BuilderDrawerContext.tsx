import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export enum DrawerTabs {
  AddElements,
}

type BuilderDrawerContextProps = {
  activeTab: DrawerTabs | null
  isShowDrawer: boolean
  handleClose: (clearActiveTab?: boolean) => void
  handleAddElementClick: () => void
}

const BuilderDrawerContext = createContext<
  BuilderDrawerContextProps | undefined
>(undefined)

/**
 * Provider component that makes drawer context object available to any
 * child component that calls `useBuilderDrawer()`.
 */
export const BuilderDrawerProvider: FC = ({ children }) => {
  const context = useProvideDrawerContext()

  return (
    <BuilderDrawerContext.Provider value={context}>
      {children}
    </BuilderDrawerContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useBuilderDrawer = (): BuilderDrawerContextProps => {
  const context = useContext(BuilderDrawerContext)
  if (!context) {
    throw new Error(
      `useBuilderDrawer must be used within a BuilderDrawerProvider component`,
    )
  }
  return context
}

const useProvideDrawerContext = (): BuilderDrawerContextProps => {
  const [activeTab, setActiveTab] = useState<DrawerTabs | null>(null)

  const isShowDrawer = useMemo(() => activeTab !== null, [activeTab])

  const handleClose = useCallback((clearActiveTab = true) => {
    if (clearActiveTab) {
      setActiveTab(null)
    }
  }, [])

  const handleAddElementClick = useCallback(() => {
    if (activeTab !== DrawerTabs.AddElements) {
      setActiveTab(DrawerTabs.AddElements)
    } else {
      handleClose()
    }
  }, [activeTab, handleClose])

  return {
    activeTab,
    isShowDrawer,
    handleClose,
    handleAddElementClick,
  }
}
