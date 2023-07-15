import db from '../contact/contact_db.js'

export const Register = async (req, res) => {
  console.log('register ')
  const { username, email, password } = req.body
  const checkUser = `SELECT COUNT(*) AS count FROM user WHERE username = ? OR email = ?`
  const insertUser =
    'INSERT INTO user (`username`, `email`, `password`) values (?, ?, ?)'

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
    connection.query(insertUser, [username, email, password])
    return res.status(200).json({ msg: 'user created' })
  } catch (error) {
    return res.status(500).json({ msg: 'server error' })
  }
}
