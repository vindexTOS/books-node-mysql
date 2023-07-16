import db from '../contact/contact_db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const Register = async (req, res) => {
  let { username, email, password } = req.body
  let role = 'user'
  const checkUser = `SELECT COUNT(*) AS count FROM user WHERE username = ? OR email = ?`
  const insertUser =
    'INSERT INTO user (`username`, `email`, `password` ,`role`) values (?, ?, ?, ?)'

  try {
    const connection = await db

    const [rows] = await connection.query(checkUser, [username, email])
    const userExists = rows[0]?.count || 0

    if (userExists > 0) {
      return res.status(409).json({ msg: 'User already exists' })
    }
    if (!username || !email || !password) {
      return res.status(402).json({ msg: 'fill up every feald' })
    }
    const token = jwt.sign(
      { user: { username, email, role } },
      process.env.JWT_STRING,
      {
        expiresIn: '1h',
      },
    )
    const cryptedPass = await bcrypt.hash(password, 10)

    password = cryptedPass
    connection.query(insertUser, [username, email, password, role])

    return res.status(200).json({ msg: 'user created', token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'server error ' })
  }
}

export const Login = async (req, res) => {
  let { email, password } = req.body
  const getUser = `SELECT * FROM user WHERE email = ?`

  try {
    const connection = await db
    const [rows] = await connection.query(getUser, [email])
    const user = rows[0]

    if (!user) {
      return res.status(400).json({ msg: 'User Does Not Exist ' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Password is wrong' })
    }
    user.password = null
    const token = jwt.sign({ user }, process.env.JWT_STRING, {
      expiresIn: '1h',
    })

    res.set('Authorization', `Bearer ${token}`)

    return res.status(200).json({ msg: 'Loged in', token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Server Error' })
  }
}
