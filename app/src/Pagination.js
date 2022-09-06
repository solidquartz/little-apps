import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage }) {
  
  return (
    // prevents going back or forward when it's not possible
    <div>
      {goToPrevPage &&
        <button onClick={goToPrevPage}>Previous</button>
      }
      {goToNextPage &&
        <button onClick={goToNextPage}>Next</button>
      }
    </div>
  )
}
