import React from 'react'
import { POSTER_IMG_URL } from '../utils/constants'

const MovieCard = ({imgUrl}) => {
  if(!imgUrl) return;
  return (
    <div className='w-40 pr-9'>
        <img alt="Image" className='rounded-lg' src={POSTER_IMG_URL+imgUrl}></img>
    </div>
  )
}

export default MovieCard