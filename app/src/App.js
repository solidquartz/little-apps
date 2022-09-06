import React, { useState, useEffect, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";


export default function App() {

  const [query, setQuery] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber);

  //ref: value that persists after each render (not part of state), often used to store references to elements, or things related to Document API.
  //we're using Intersection Observer, part of Document API: says when the referenced element is in view
  const observer = useRef();
  //when the reference changes, it doesn't rerender on its own, so we use useCallback
  //'node' corresponds to the individual element with the lastBookElementRef ref


  const lastBookElementRef = useCallback(node => {
    //prevents constant API calls when there is nothing
    if (loading) return;
    //if there is an observer, disconnect from it (cleanup) so the new last element ref will be hooked up correctly
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      //if the "ref" entry is on the page somewhere AND there are more entries
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });
    //if something is actually our last element, our observer will observe it
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);



  useBookSearch(query, pageNumber);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
      >
      </input>

      {books.map((book, index) => {
        //sets the reference for only the very last book
        if (books.length === index + 1) {
          //whenever the element is created, it will call the function inside useCallback with the reference to this element
          return <div ref={lastBookElementRef} key={book}>{book}</div>;
        } else {
          //if it's not the last book, just render the title on the page
          return <div key={book}>{book}</div>;
        }
      })}

      <div>
        {loading && 'Loading...'}
      </div>

      <div>
        {error && 'Error!'}
      </div>
    </>
  );
}
