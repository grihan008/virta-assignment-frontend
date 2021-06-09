import React, { useEffect, useState } from "react";

/**
 * Fetches JSON data from specified url
 * @param {string} url
 *
 * @returns {[]} array containing loading, error, data, and a method for refetching
 */
function useFetchJSON(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchData = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          setError(false);
          setResponse(res);
        },
        (err) => setError(true)
      )
      .catch((e) => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return [loading, error, response, () => fetchData(url)];
}

export default useFetchJSON;
