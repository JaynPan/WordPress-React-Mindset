import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BookItem from './Bookitem';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/books`)
      .then(res => {
        setBooks(res.data);
        setIsLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  if(isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {books.map(book => {
        return <BookItem book={book} key={book.id} />
      })}
    </div>
  )
}