import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function BookPage(props) {
  const [state, setState] = useState({ book: {}, isLoading: true })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/books/${props.match.params.id}`)
      .then(res => {
        setState({ book: res.data, isLoading: false })
      })
      .catch(err => console.log(err))
  }, [])

  const { isLoading, book } = state;

  if(isLoading) {
    return <h3>loading...</h3>
  }

  return(
    <Fragment>
      <Link to='/'>Go Back</Link>
      <hr />
      <h1>{book.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
      <p>Publisher: {book.acf.publisher}</p>
    </Fragment>
  )
} 