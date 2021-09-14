import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm, clearSearchTerm, toggleSkip, selectSkip } from './searchBarSlice'
import './searchBar.css'

const SearchBar = () => {
  let searchTerm = useSelector(selectSearchTerm);
  let skip = useSelector(selectSkip);
  const dispatch = useDispatch();
 
  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
   if (skip) {
      //meaning, the user is currently on the main popular page and we want to see the search results
      console.log("Searching...")
      dispatch(toggleSkip())
    }
    else {
//after the first search term is input, "skip" is now off, which means that RTK Query fires every time searchTerm changes in state, which is to say every time the user hits one key.
//this is not desired behavior but IDK how to fix at the moment
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!skip)
    dispatch(clearSearchTerm())
  }

  return (
    <form id="search-container" onSubmit={handleSubmit}>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
        placeholder="Search"
      />
      <button onClick={handleClick}>Back to "Popular"</button>
      {/* <input type="submit" style={{display: 'none'}} /> */}
      {/* for a reason I don't understand, this form no longer accepts hitting enter as a submit, so i've temporarily made the submit button visible */}
      <input type="submit"/>
    </form>
  );
}
  
export default SearchBar;