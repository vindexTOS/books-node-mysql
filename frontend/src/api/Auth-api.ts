import axios from 'axios'
import { url } from '../globals/global-url'
import { RegisterObj, LoginObj } from '../types/Auth-types'

export const Register = async (registerObj: RegisterObj) => {
  const post = await axios.post(`${url}/auth/register`, registerObj)

  return post.data
}

export const SignIn = async (loginObj: LoginObj) => {
  try {
    const post = await axios.post(`${url}/auth/login`, loginObj)
    return post.data
  } catch (error) {
    console.log(error)
    throw error // Rethrow the error to handle it in the mutation logic
  }
}
