import axios from 'axios'
import { url } from '../globals/global-url'
import { RegisterObj } from '../types/Auth-types'

export const Register = async (registerObj: RegisterObj) => {
  const post = await axios.post(url, registerObj)

  return post
}
