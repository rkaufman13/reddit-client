import './App.css';
import Header from './Header/Header';
import SearchBar from '../Features/searchBar/SearchBar';
import Filter from '../Features/filter/Filter';
import Content from '../Features/content/Content'

function App() {
  return (
    <div className="App">
<Header/>
<SearchBar/>
<Filter/>
<Content/>      
    </div>
  );
}

export default App;
