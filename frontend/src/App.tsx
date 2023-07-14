import { useEffect, useState } from 'react'

function App() {
  const [books, setBooks] = useState<any>()

  useEffect(() => {
    fetch(`http://localhost:5566/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <section>
      <button onClick={() => console.log(books)}>check</button>
    </section>
  )
}

export default App
