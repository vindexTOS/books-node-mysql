import db from '../contact/contact_db'
import { BookType } from '../types/books-types'
export const GetBooks = async (req, res) => {
  const q = 'SELECT * FROM books'

  try {
    ;(await db).query(q, (err, data) => {
      if (err) {
        return res.status(400).json({ msg: 'database error', err })
      }

      return res.status(200).json(data)
    })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'General Server Error', err: error.message })
  }
}

export const PostBook = async (req, res) => {
  const q = 'INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)'
  const values = [req.body.title, req.body.desc, req.body.cover]

  try {
    const connection = await db
    connection.query(q, values)

    return res.status(200).json('Book created')
  } catch (error) {
    return res.status(500).json({ msg: 'General server error' })
  }
}
