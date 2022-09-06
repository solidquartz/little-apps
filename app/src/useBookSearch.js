import { useEffect, useState } from 'react';
import axios from 'axios';

//CUSTOM HOOK

//query = what is typed into the search input.
//pageNumber is from the API, even though our scroll is "pageless"
export default function useBookSearch(query, pageNumber) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  //prevents requests to API when no more results remain
  const [hasMore, setHasMore] = useState(false);

  //changes the results with a new search instead of appending the new results
  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {

    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      //params are from API docs
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })

      .then(res => {
        //combines new books and old books
        setBooks(prevBooks => {
          //just grabs the title of the books WITHOUT dupes thanks to Set.
          //spreads it to convert it back to an array
          //spreading res.data.docs formats the results better
          return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
        })
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch(e => {
        //if it's cancelled, we meant to do that, so ignore the error
        if (axios.isCancel(e)) return;
        setError(true);
      });

    //cleans up, prevents constant requests
    return () => cancel();

  }, [query, pageNumber]);
  //runs every time the query or pageNumber change

  return { loading, error, books, hasMore };
}
