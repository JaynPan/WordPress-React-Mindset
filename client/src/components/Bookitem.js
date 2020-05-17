import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL

export default function BookItem({ book }) {
  const [state, setState] = useState({ author: '', imageUrl: '', isLoading: true })

  useEffect(() => {
    const { featured_media, author } = book;
    const getImagUrl = axios.get(`${API_URL}/wp-json/wp/v2/media/${featured_media}`)
    const getAuthor = axios.get(`${API_URL}/wp-json/wp/v2/users/${author}`);

    Promise.all([getImagUrl, getAuthor])
      .then(res => {
        setState({
          isLoading: false,
          imageUrl: res[0].data.media_details.sizes.full.source_url,
          author: res[1].data.name
        })
      })
  }, [])

  const { author, imageUrl, isLoading } = state;
  const { title, excerpt, id } = book;

  if(isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{title.rendered}</h2>
      <small>Reviewed by <strong>{author}</strong></small>
      <img style={{ width: '100%' }} src={imageUrl} alt={title.rendered}  />
      <div dangerouslySetInnerHTML={{__html: excerpt.rendered}} />
      <Link to={`/book/${id}`}>Read Review</Link>
      <hr />
    </div>
  )
}