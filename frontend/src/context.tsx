import { createContext, useContext, useEffect, useRef, useState } from 'react'
import useOutClick from './hooks/useOutClick'
import axios from 'axios'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query'
import { RegisterObj, LoginObj } from './types/Auth-types'
import { Register, SignIn } from './api/Auth-api'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'

type mutationType =
  | UseMutationResult<any, unknown, RegisterObj, unknown>
  | UseMutationResult<any, unknown, LoginObj, unknown>

interface Cell {
  register: UseFormRegister<FieldValues>
  // UI state data
  authPopUpRef: React.MutableRefObject<null>
  authPopUp: boolean
  setAuthPopUp: React.Dispatch<React.SetStateAction<boolean>>
  registerSwitch: boolean
  setRegisterSwitch: React.Dispatch<React.SetStateAction<boolean>>

  // server data for authentication
  handleRegister: () => void
  handleLogin: () => void
  handleSignOut: () => void
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // library declerations
  const { register, getValues } = useForm()
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')

  // AUTHENTIFICATION REGISTRATION LOGIN LOGIC SERVER AND UI
  // auth state and server side

  // UI state
  const [authPopUp, setAuthPopUp] = useState<boolean>(false)
  const authPopUpRef = useRef(null)

  const popUpHanndler = () => {
    setAuthPopUp(false)
  }
  useOutClick(authPopUpRef, popUpHanndler)
  const [registerSwitch, setRegisterSwitch] = useState<boolean>(false)

  // SERVER DATA //
  const [userData, setUserData] = useState<any>()
  const mutationRegister = useMutation((registerObj: RegisterObj) =>
    Register(registerObj),
  )
  const mutationLogin = useMutation((loginObj: LoginObj) => SignIn(loginObj), {
    onError: (error) => {
      console.log(error)
    },
  })
  const handleRegister = () => {
    mutationRegister.mutate({
      username: getValues('name'),
      password: getValues('password'),
      email: getValues('email'),
    })
    console.log(mutationRegister)
  }

  const handleLogin = async () => {
    await mutationLogin.mutateAsync({
      email: getValues('email'),
      password: getValues('password'),
    })
  }
  const tokenSaverFunction = (mutation: mutationType) => {
    const newToken = mutation?.data.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    const decoded: any = jwt(newToken)
    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })
  }

  useEffect(() => {
    if (mutationLogin?.data && mutationLogin?.data.token) {
      return tokenSaverFunction(mutationLogin)
    } else if (mutationRegister?.data && mutationRegister?.data.token) {
      return tokenSaverFunction(mutationRegister)
    }
  }, [mutationLogin, mutationRegister])
  useEffect(() => {
    console.log(userData)
  }, [userData])
  useEffect(() => {
    const decoded: any = jwt(token)
    setUserData(decoded)
  }, [])
  const handleSignOut = () => {
    cookies.remove('jwt_authorization')
    console.log('log out')
  }

  // re setting headers after reload
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  }, [cookies])
  return (
    <Context.Provider
      value={{
        register,
        // ui data for auth
        authPopUpRef,
        authPopUp,
        setAuthPopUp,
        registerSwitch,
        setRegisterSwitch,
        // server data  for auth
        handleRegister,
        handleLogin,
        handleSignOut,
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
