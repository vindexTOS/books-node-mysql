import { createContext, useContext, useRef, useState } from 'react'
import useOutClick from './hooks/useOutClick'
interface Cell {
  authPopUpRef: React.MutableRefObject<null>
  authPopUp: boolean
  setAuthPopUp: React.Dispatch<React.SetStateAction<boolean>>
  registerSwitch: boolean
  setRegisterSwitch: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [authPopUp, setAuthPopUp] = useState<boolean>(false)
  const authPopUpRef = useRef(null)

  const popUpHanndler = () => {
    setAuthPopUp(false)
  }
  useOutClick(authPopUpRef, popUpHanndler)

  const [registerSwitch, setRegisterSwitch] = useState<boolean>(false)
  return (
    <Context.Provider
      value={{
        authPopUpRef,
        authPopUp,
        setAuthPopUp,
        registerSwitch,
        setRegisterSwitch,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const UseMainContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('Not Wrapped')
  }

  return context
}
