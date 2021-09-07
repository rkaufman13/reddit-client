import './App.css';
import Header from './Header/Header';
import SearchBar from '../Features/searchBar/SearchBar';
import Filter from '../Features/filter/Filter';
import Content from '../Features/content/Content'


function App() {
  
  // App will be the first component rendered and will subsequenty render all components. If there is an asynchronous call, it will have to wait, so don't do that. We want to render a skeleton of the page before requests are made to fill our data. We can accomplish this by 
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
