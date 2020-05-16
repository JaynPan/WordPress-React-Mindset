import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookItem({ book }) {
  const { title, excerpt } = book;
  const [state, setState] = useState({ author: '', imageUrl: '', isLoading: true })

  useEffect(() => {
    const { featured_media, author } = book;
    const getImagUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`)
    const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);

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

  if(isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{title.rendered}</h2>
      <small>Reviewed by <strong>{author}</strong></small>
      <img style={{ width: '100%' }} src={imageUrl} alt={title.rendered}  />
      <div dangerouslySetInnerHTML={{__html: excerpt.rendered}} />
    </div>
  )
}