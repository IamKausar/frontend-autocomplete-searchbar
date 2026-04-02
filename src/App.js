import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultCache, setResultCache] = useState({});

  useEffect(() => {
    const timer = setTimeout(fetchresults, 300);

    return () => {
      clearTimeout(timer); //ensures that if the user types another letter before 300ms is up, the previous pending request is cancelled.
    };
  }, [searchText]);

  const fetchresults = async function () {
    if (resultCache[searchText]) {
      setSearchResult(resultCache[searchText]);
      return;
    }
    const results = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchText}`
    );
    const resultData = await results.json();
    setResultCache((prev) => ({ ...prev, [searchText]: resultData.recipes }));

    setSearchResult(resultData.recipes);
  };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleShowResult = (show) => {
    setShowResult(show);
  };

  return (
    <div className="App">
      <h1>Autocomplete Searchbar</h1>
      <input
        className="search-input-bar"
        value={searchText}
        onChange={(e) => handleSearchInput(e)}
        onFocus={() => handleShowResult(true)}
        onBlur={() => handleShowResult(false)}
      />
      <div className="result-container">
        {showResult &&
          searchResult.map((res) => (
            <span className="search-result" key={res.id}>
              {res.name}
            </span>
          ))}
      </div>
    </div>
  );
}
