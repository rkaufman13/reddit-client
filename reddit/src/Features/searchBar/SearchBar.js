import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from './searchBarSlice'
import './searchBar.css'

const SearchBar = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
 
  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(searchForTerm(searchTerm))
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
    </form>
  );
}
  
export default SearchBar;