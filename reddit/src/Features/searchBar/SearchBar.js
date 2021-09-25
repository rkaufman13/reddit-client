import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSkipMain, setSearchTerm } from "./searchBarSlice";
// import "./searchBar.css";

export const SearchBar = () => {
  // By handling searchBar state locally, we can set and clear the the term without affecting the Content component.
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  // Again, by handling locally, no redux store state is affected, meaning no unnecessary actions.
  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    setTerm(userInput);
    console.log(term)
  };

  // Then when the user submits, we can set the search term in the redux store. We will also set skipMain to true.
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
    dispatch(setSkipMain(true));
  };

  // Then when the user is ready to go back to the popular page, we can set skipMain to false. I decided this was better than toggling as it's easier to control it directly than have toggling being fired at potentially unwanted times.
  const handleBackClick = () => {
    dispatch(setSkipMain(false));
  };

  // user can clear local search state with the click of a button. Turn this into an x within the search bar in the future.
  const handleClearClick = () => {
    setTerm("");
    dispatch(setSkipMain(false))
  };

  return (
    <div id="searchbar" class="d-flex">
      <form id="search-container" onSubmit={handleSubmit}>

        <input
          id="search"
          type="search"
          value={term}
          onChange={onSearchTermChangeHandler}
          placeholder="Search"
        />
      </form>
      <button onClick={handleClearClick} className={term ? "btn btn-link":"btn btn-link collapse"}>clear search</button> 
      {/* <button onClick={handleBackClick}>back to popular</button> */}
    </div>
  );
};

export default SearchBar;
