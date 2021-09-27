import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSkipMain, setSearchTerm } from "./searchBarSlice";
import "./searchBar.css";

export const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false)

  const dispatch = useDispatch();

  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    setTerm(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
    dispatch(setSkipMain(true));
    setShow(true);
  };

  const handleBackClick = () => {
    dispatch(setSkipMain(false));
    setShow(false);
    setTerm('');
  };

  return (
    <div id="searchbar" className="d-flex">
      <form id="search-container" onSubmit={handleSubmit}>
        <input
          id="search"
          type="search"
          value={term}
          onChange={onSearchTermChangeHandler}
          placeholder="Search"
        />
      </form>
      {show && <button id="button" onClick={handleBackClick}>back to 'popular'</button>}
    </div>
  );
};
